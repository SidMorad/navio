package com.rahpey.traffic.infrastructure.kafka;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;

import com.rahpey.traffic.web.rest.tracking.CarSpeedCommand;

public class KafkaProducerClient {

    @Value("${application.kafka.topicOpentraffic}")
    private String topicOpentraffic;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    /**
     * Sends message to Kafka server
     *
     * @param topic
     * @param key
     * @param message
     */
    public void send(String topic, String key, String message) {
        logger.debug("Sending message='{}' with key='{}' to topic='{}'", message, key, topic);
        kafkaTemplate.send(topic, key, message);
    }

    public void sendCarSpeedToTrafficEngine(CarSpeedCommand cmd) {
        //  Current OpenTraffic message format: `,sv,\\|,1,9,10,0,5,yyyy-MM-dd HH:mm:ss`
        //  An example: `2017-01-31 16:00:00|uuid_abcdef|x|x|x|accuracy|x|x|x|lat|lon|x|x|x`
        String message = String.format("%s|%s|x|x|x|%s|x|x|x|%s|%s|x|x|x",
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                cmd.getUuid(), cmd.getAccuracy(), cmd.getLatitude(), cmd.getLongitude());
        send(topicOpentraffic, cmd.getUuid(), message);
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

}
