package com.rahpey.uaa.web.rest;

import com.rahpey.uaa.service.SocialService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.social.support.URIBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/social")
public class SocialController {

    private final Logger log = LoggerFactory.getLogger(SocialController.class);

    private final SocialService socialService;

    private final ProviderSignInUtils providerSignInUtils;

    private final Environment environment;

    public SocialController(SocialService socialService, ProviderSignInUtils providerSignInUtils,
                            Environment environment) {
        this.socialService = socialService;
        this.providerSignInUtils = providerSignInUtils;
        this.environment = environment;
    }

    @GetMapping("/signup")
    public RedirectView signUp(WebRequest webRequest, @CookieValue(name = "NG_TRANSLATE_LANG_KEY", required = false, defaultValue = "\"en\"") String langKey) {
        String baseUrl = environment.getProperty("spring.application.url");
        try {
            Connection<?> connection = providerSignInUtils.getConnectionFromSession(webRequest);
            socialService.createSocialUser(connection, langKey.replace("\"", ""));
            return new RedirectView(URIBuilder.fromUri(baseUrl + "/#/social-register/" + connection.getKey().getProviderId())
                .queryParam("success", "true")
                .build().toString(), false);
        } catch (Exception e) {
            log.error("Exception creating social user: ", e);
            return new RedirectView(URIBuilder.fromUri(baseUrl + "/#/social-register/no-provider")
                .queryParam("success", "false")
                .build().toString(), false);
        }
    }
}
