package com.rahpey.traffic.cucumber.stepdefs;

import com.rahpey.traffic.TrafficApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TrafficApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
