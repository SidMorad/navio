#!/bin/sh

mvn test-compile
java -classpath target/test-classes com.rahpey.route.web.rest.util.ABtestingHelper
