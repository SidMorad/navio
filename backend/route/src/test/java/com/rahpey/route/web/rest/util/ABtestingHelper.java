package com.rahpey.route.web.rest.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Random;
import java.util.Scanner;

public class ABtestingHelper {

    public final static double x0 = 35.6961;   // A central latitude point in Tehran city
    public final static double y0 = 51.4231;   // A central longitude point in Tehran city
    public final static double radiusInMeters = 30000; // 30 KiloMeter
    public final static double radiusInDegrees = radiusInMeters / 111320f;

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

    public static void main(String[] args) {
        System.out.println("How many random point needed? [10000]");
        Scanner stdin = new Scanner(System.in);
        String total = stdin.nextLine();
        System.out.println("Output file? [/tmp/randomGeoPoints.txt]");
        String outputFilename = stdin.nextLine();
        stdin.close();
        if (total.trim().isEmpty()) {
            total = "10000";
        }
        if (outputFilename.trim().isEmpty()) {
            outputFilename = "/tmp/randomGeoPoints.tx";
        }

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputFilename))) {
            for (int i = 0; i < new Integer(total); i++) {
                bw.write(randomGeoPoint().toString());
                bw.newLine();
            }
        } catch (IOException io) {
            io.printStackTrace();
        }
        System.out.println("Done. see " + outputFilename);
    }

    static class GeoPoint {
        double lat;
        double lng;
        GeoPoint(double latitude, double longitude) {
            this.lat = latitude;
            this.lng = longitude;
        }
        public double lat() {
            return lat;
        }
        public double lng() {
            return lng;
        }
        @Override
        public String toString() {
            return lat + "," + lng;
        }
    }

}