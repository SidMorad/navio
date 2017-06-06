package com.rahpey.route.cucumber.stepdefs;

import com.rahpey.route.RouteApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = RouteApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
