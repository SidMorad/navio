package com.rahpey.route.web.rest.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

public class ABtestingHelper {

    public final static double x0 = 35.6961;   // A central latitude point in Tehran city
    public final static double y0 = 51.4231;   // A central longitude point in Tehran city
    public final static double radiusInMeters = 30000; // 30 KiloMeter
    public final static double radiusInDegrees = radiusInMeters / 111320f;

    public static List<GeoPoint> generatedPoints = new ArrayList<GeoPoint>();

    static GeoPoint randomGeoPoint() {
        Random random = new Random();

        // Get a random distance and a random angle.
        double u = random.nextDouble();
        double v = random.nextDouble();
        double w = radiusInDegrees * Math.sqrt(u);
        double t = 2 * Math.PI * v;

        // Get the x and y delta values.
        double x = w * Math.cos(t);
        double y = w * Math.sin(t);

        // Compensate the x value.
        double new_x = x / Math.cos(Math.toRadians(x0));

        double foundLatitude = x0 + y;
        double foundLongitude = y0 + new_x;
        return new GeoPoint(foundLatitude, foundLongitude);
    }

    public static void main(String[] args) throws IOException {
        System.out.println("How many random point needed? [2000]");
        Scanner stdin = new Scanner(System.in);
        String totalString = stdin.nextLine();
        System.out.println("Output directory? [/tmp/navio]");
        String outputDirectory = stdin.nextLine();
        System.out.println("Default server end-point? [https://navio.ir]");
        String serverEndpoint = stdin.nextLine();
        stdin.close();
        Integer total;
        if (totalString.trim().isEmpty()) {
            total = 2000;
        } else {
            total = Integer.valueOf(totalString);
        }
        if (outputDirectory.trim().isEmpty()) {
            outputDirectory = "/tmp/navio";
        }
        if (serverEndpoint.trim().isEmpty()) {
            serverEndpoint = "https://navio.ir";
        }
        if (Files.notExists(Paths.get(outputDirectory))) {
            Files.createDirectory(Paths.get(outputDirectory));
        }
        // Generating random points
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/randomGeoPoints.txt"))) {
            for (int i = 0; i < total; i++) {
                GeoPoint random = randomGeoPoint();
                generatedPoints.add(random);
                bw.write(random.toString());
                bw.newLine();
            }
        } catch (IOException io) { }

        // Generating random route urls
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/routeUrls.txt"))) {
            for (int i = 0; i < total; i = i + 2) {
                bw.write(String.format("%s/route/v1/get?point=%s&point=%s",
                        serverEndpoint, generatedPoints.get(i).toString(), generatedPoints.get(i+1).toString()));
                bw.newLine();
            }
        } catch (IOException io) { }

        // Generating random geocoding reverse search urls
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/geocodingReverseUrls.txt"))) {
            for (int i = 0; i < total; i = i + 2) {
                bw.write(String.format("%s/geocoding/reverse?lat=%s&lon=%s&format=json&addressdetails=1&countrycode=ir&accept-language=fa&zoom=%s",
                        serverEndpoint, generatedPoints.get(i).lat, generatedPoints.get(i).lon, 16));
                bw.newLine();
            }
        } catch (IOException io) { }

        // Generating random geocoding search urls
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/geocodingSearchUrls.txt"))) {
            for (int i = 0; i < total; i = i + 2) {
                bw.write(String.format("%s/geocoding/search?q=%s&format=json&addressdetails=0&limit=10&countrycodes=ir&accept-language=en",
                        serverEndpoint, getRandomString()));
                bw.newLine();
            }
        } catch (IOException io) { }

        // Generating random tile urls
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/tileUrls.txt"))) {
            for (int i = 0; i < total; i = i + 2) {
                bw.write(String.format("%s/tile/%s.png", serverEndpoint, getTileNumber(generatedPoints.get(i))));
                bw.newLine();
            }
        } catch (IOException io) { }

        // Creating Siege script
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputDirectory + "/siege.sh"))) {
            bw.write("#!/bin/sh");
            bw.newLine();
            bw.newLine();
            String logOutput = outputDirectory + "/" + new Date().getTime() + "-siege.log";
            bw.write(String.format("siege -f %s -c %s --reps=once --log=%s",
                    outputDirectory + "/tileUrls.txt", 500, logOutput));
            bw.newLine();
            bw.newLine();
            bw.write(String.format("siege -f %s -c %s --reps=once --log=%s",
                    outputDirectory + "/geocodingReverseUrls.txt", 500, logOutput));
            bw.newLine();
            bw.newLine();
            bw.write(String.format("siege -f %s -c %s --reps=once --log=%s",
                    outputDirectory + "/geocodingSearchUrls.txt", 500, logOutput));
            bw.newLine();
            bw.newLine();
            bw.write(String.format("siege -f %s -c %s --reps=once --log=%s",
                    outputDirectory + "/routeUrls.txt", 500, logOutput));
            bw.newLine();
        } catch (IOException io) { }

        Runtime.getRuntime().exec("chmod u+x " + outputDirectory + "/siege.sh");

        System.out.println("Done. see " + outputDirectory);
    }

    /**
     * Credit goes to http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
     *
     * @param a GeoPoint
     * @return a valid tile url path
     */
    private static String getTileNumber(GeoPoint gp) {
        int zoom = ThreadLocalRandom.current().nextInt(15, 18 + 1);         // Random Zoom between 15 and 18
        int xtile = (int)Math.floor( (gp.lon + 180) / 360 * (1<<zoom) ) ;
        int ytile = (int)Math.floor( (1 - Math.log(Math.tan(Math.toRadians(gp.lat)) + 1 / Math.cos(Math.toRadians(gp.lat))) / Math.PI) / 2 * (1<<zoom) ) ;

        if (xtile < 0)
            xtile = 0;
        if (xtile >= (1<<zoom))
            xtile = ((1<<zoom)-1);
        if (ytile < 0)
            ytile = 0;
        if (ytile >= (1<<zoom))
            ytile = ((1<<zoom)-1);

        return String.format("%s/%s/%s", zoom, xtile, ytile);
    }

    public static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    public static final String lower = upper.toLowerCase();
    public static final String digits = "0123456789";
    public static final String str = upper + lower + digits;
    private static String getRandomString() {
        int textLength = ThreadLocalRandom.current().nextInt(2, 20);
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < textLength; i++) {
            sb.append(str.charAt(ThreadLocalRandom.current().nextInt(0, str.length())));
        }
        return sb.toString();
    }

    static class GeoPoint {
        double lat;
        double lon;
        GeoPoint(double latitude, double longitude) {
            this.lat = latitude;
            this.lon = longitude;
        }
        public double lat() {
            return lat;
        }
        public double lon() {
            return lon;
        }
        @Override
        public String toString() {
            return lat + "," + lon;
        }

        @Override
        public int hashCode() {
            return Double.valueOf(lat).intValue() + Double.valueOf(lon).intValue();
        }
    }

}
