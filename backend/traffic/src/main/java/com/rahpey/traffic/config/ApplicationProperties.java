package com.rahpey.traffic.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to JHipster.
 * <p>
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Kafka kafka = new Kafka();

    public Kafka getKafka() {
        return kafka;
    }

    public static class Kafka {

        private String bootstrapServers;
        private String topicOpentraffic;

        public String getBootstrapServers() {
            return bootstrapServers;
        }

        public void setBootstrapServers(String bootstrapServers) {
            this.bootstrapServers = bootstrapServers;
        }

        public String getTopicOpentraffic() {
            return topicOpentraffic;
        }

        public void setTopicOpentraffic(String topicOpentraffic) {
            this.topicOpentraffic = topicOpentraffic;
        }

    }

}