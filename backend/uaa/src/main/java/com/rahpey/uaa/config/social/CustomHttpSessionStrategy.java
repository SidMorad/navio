package com.rahpey.uaa.config.social;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.social.connect.web.SessionStrategy;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

/**
 * This class used as workaround for session-less environment
 *
 * Proper solution will be available after following issues get resolved:
 * https://github.com/jhipster/generator-jhipster/issues/4850
 * https://github.com/spring-projects/spring-social/issues/216
 *
 */
public class CustomHttpSessionStrategy implements SessionStrategy {

    private final static Map<String, Object> sessionStore = new HashMap<String, Object>();

    @Override
    public void setAttribute(RequestAttributes request, String name, Object value) {
//      request.setAttribute(name, value, RequestAttributes.SCOPE_SESSION);
        logger.debug("setAttribute {} for key: {}", value, key(request, name));
        sessionStore.put(key(request, name), value);
    }

    @Override
    public Object getAttribute(RequestAttributes request, String name) {
//      return request.getAttribute(name, RequestAttributes.SCOPE_SESSION);
        logger.debug("getAttribute with key: {}", key(request, name));
        return sessionStore.get(key(request, name));
    }

    @Override
    public void removeAttribute(RequestAttributes request, String name) {
//      request.removeAttribute(name, RequestAttributes.SCOPE_SESSION);
        logger.debug("removeAttribute with key: {}", key(request, name));
        sessionStore.remove(key(request, name));
    }

    public String key(RequestAttributes request, String name) {
        final ServletWebRequest webRequest = (ServletWebRequest) request;
        return String.format("%s_%s", name, webRequest.getHeader("User-Agent"));
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

}
