package com.rahpey.gateway.web.rest.deeplinks;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * A Controller for handling /dl deeplinks
 */
@RestController
@RequestMapping("/dl")
public class DeepLinkResource {

    @GetMapping("/{latLngZoom:.+}")
    @Timed
    public void get(@PathVariable("latLngZoom") String latLngZoom, HttpServletResponse response) throws IOException {
        logger.info("Deeplink requested for {}", latLngZoom);
        response.sendRedirect("/#dl/" + latLngZoom);
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

}