package com.rahpey.route.web.rest;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.PathWrapper;
import com.graphhopper.routing.util.HintsMap;
import com.graphhopper.util.Helper;
import com.graphhopper.util.InstructionList;
import com.graphhopper.util.PointList;
import com.graphhopper.util.exceptions.GHException;
import com.graphhopper.util.shapes.GHPoint;
import com.rahpey.route.service.RouteEngineService;
import com.rahpey.route.web.rest.util.GraphHopperWebHelper;

import static com.graphhopper.util.Parameters.Routing.*;

/**
 * Route REST API for /route/v1 end-point
 *
 */
@RestController
@RequestMapping("/v1")
public class RouteResource {

    private RouteEngineService routeEngineService;

    public RouteResource(RouteEngineService routeEngineService) {
        this.routeEngineService = routeEngineService;
    }

    @GetMapping("/get")
    @Timed
    public ResponseEntity<?> routing(HttpServletRequest httpReq) {

        List<GHPoint> point = getPoints(httpReq, "point");
        boolean writeGPX = "gpx".equalsIgnoreCase(getParam(httpReq, "type", "json"));
        boolean enableInstructions = writeGPX || getBooleanParam(httpReq, "instructions", true);
        boolean calcPoints = getBooleanParam(httpReq, "calc_points", true);
        boolean enableElevation = getBooleanParam(httpReq, "elevation", false);
        boolean pointsEncoded = getBooleanParam(httpReq, "points_encoded", true);
        String algoStr = getParam(httpReq, "algorithm", "");

        GHRequest request = new GHRequest(point);
        request.getHints().put(CALC_POINTS, calcPoints).
                           put(INSTRUCTIONS, enableInstructions);
        initHints(request.getHints(), httpReq.getParameterMap());
        request.setAlgorithm(algoStr);

        GHResponse ghRsp = routeEngineService.route(request);

        Map<String, Object> map = toMap(ghRsp, calcPoints, pointsEncoded,
                enableElevation, enableInstructions);

        if (ghRsp.hasErrors()) {
            logger.error("GraphHopper response has error: {}", getMessage(ghRsp.getErrors().get(0)));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }

        return ResponseEntity.ok(map);
    }

    private void initHints(HintsMap m, Map<String, String[]> parameterMap) {
        for (Map.Entry<String, String[]> e : parameterMap.entrySet()) {
            if (e.getValue().length == 1) {
                m.put(e.getKey(), e.getValue()[0]);
            }
        }
    }

    private List<GHPoint> getPoints(HttpServletRequest req, String key) {
        String[] pointsAsStr = getParams(req, key);
        final List<GHPoint> infoPoints = new ArrayList<GHPoint>(pointsAsStr.length);
        for (String str : pointsAsStr) {
            String[] formStrs = str.split(",");
            if (formStrs.length == 2) {
                GHPoint point = GHPoint.parse(str);
                if (point != null) {
                    infoPoints.add(point);
                }
            }
        }
        return infoPoints;
    }

    private boolean getBooleanParam(HttpServletRequest req, String key, boolean _default) {
        try {
            return Boolean.parseBoolean(getParam(req, key, "" + _default));
        } catch (Exception ex) {
            return _default;
        }
    }

    private String getParam(HttpServletRequest req, String key,
            String _default) {
        String[] l = req.getParameterMap().get(key);
        if (l != null && l.length > 0) {
            return l[0];
        }
        return _default;
    }

    private String[] getParams(HttpServletRequest req, String key) {
        String[] l = req.getParameterMap().get(key);
        if (l != null && l.length > 0) {
            return l;
        }
        return new String[0];
    }

    private String getMessage(Throwable t) {
        if (t.getMessage() == null)
            return t.getClass().getSimpleName();
        else
            return t.getMessage();
    }

    private Map<String, Object> toMap(GHResponse rsp, boolean calcPoints,
            boolean pointsEncoded, boolean includeElevation,
            boolean enableInstructions) {
        Map<String, Object> json = new HashMap<String, Object>();

        if (rsp.hasErrors()) {
            json.put("message", getMessage(rsp.getErrors().get(0)));
            List<Map<String, Object>> errorHintList = new ArrayList<>();
            for (Throwable t : rsp.getErrors()) {
                Map<String, Object> map = new HashMap<>();
                map.put("message", getMessage(t));
                map.put("details", t.getClass().getName());
                if (t instanceof GHException) {
                    map.putAll(((GHException) t).getDetails());
                }
                errorHintList.add(map);
            }
            json.put("hints", errorHintList);
        } else {
            Map<String, Object> jsonInfo = new HashMap<String, Object>();
            json.put("info", jsonInfo);
            json.put("hints", rsp.getHints().toMap());
            // If you replace GraphHopper with your own brand name, this is
            // fine.
            // Still it would be highly appreciated if you mention us in your
            // about page!
            jsonInfo.put("copyrights", Arrays.asList("Rahpey", "GraphHopper",
                    "OpenStreetMap contributors"));

            List<Map<String, Object>> jsonPathList = new ArrayList<Map<String, Object>>();
            for (PathWrapper ar : rsp.getAll()) {
                Map<String, Object> jsonPath = new HashMap<String, Object>();
                jsonPath.put("distance", Helper.round(ar.getDistance(), 3));
                jsonPath.put("weight", Helper.round6(ar.getRouteWeight()));
                jsonPath.put("time", ar.getTime());
                jsonPath.put("transfers", ar.getNumChanges());
                if (!ar.getDescription().isEmpty())
                    jsonPath.put("description", ar.getDescription());

                if (calcPoints) {
                    jsonPath.put("points_encoded", pointsEncoded);

                    PointList points = ar.getPoints();
                    // if (points.getSize() >= 2) {
                    // TODO BBox maxBounds2D = new BBox(maxBounds.minLon,
                    // maxBounds.maxLon, maxBounds.minLat, maxBounds.maxLat);
                    // FIXME jsonPath.put("bbox",
                    // ar.calcRouteBBox(maxBounds2D).toGeoJson());
                    // }

                    jsonPath.put("points", createPoints(points, pointsEncoded, includeElevation));

                    if (enableInstructions) {
                        InstructionList instructions = ar.getInstructions();
                        jsonPath.put("instructions", instructions.createJson());
                    }

                    jsonPath.put("legs", ar.getLegs());

                    jsonPath.put("ascend", ar.getAscend());
                    jsonPath.put("descend", ar.getDescend());
                }

                jsonPath.put("snapped_waypoints", createPoints(ar.getWaypoints(), pointsEncoded, includeElevation));
                if (ar.getFare() != null) {
                    jsonPath.put("fare", NumberFormat.getCurrencyInstance().format(ar.getFare()));
                }
                jsonPathList.add(jsonPath);
            }

            json.put("paths", jsonPathList);
        }
        return json;
    }

    private Object createPoints(PointList points, boolean pointsEncoded, boolean includeElevation) {
        if (pointsEncoded)
            return GraphHopperWebHelper.encodePolyline(points, includeElevation);

        Map<String, Object> jsonPoints = new HashMap<String, Object>();
        jsonPoints.put("type", "LineString");
        jsonPoints.put("coordinates", points.toGeoJson(includeElevation));
        return jsonPoints;
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

}
