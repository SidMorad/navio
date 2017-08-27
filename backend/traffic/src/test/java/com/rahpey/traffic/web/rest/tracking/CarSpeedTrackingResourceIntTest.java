package com.rahpey.traffic.web.rest.tracking;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.List;

import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.MessageListenerContainer;
import org.springframework.kafka.test.rule.KafkaEmbedded;
import org.springframework.kafka.test.utils.ContainerTestUtils;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.geometry.S2CellId;
import com.google.common.geometry.S2LatLng;
import com.rahpey.traffic.TrafficApp;
import com.rahpey.traffic.config.SecurityBeanOverrideConfiguration;
import com.rahpey.traffic.domain.model.car.CarSpeed;
import com.rahpey.traffic.infrastructure.kafka.KafkaProducerClient;
import com.rahpey.traffic.repository.CarSpeedRepository;
import com.rahpey.traffic.web.rest.TestUtil;


/**
 * Test class for CarSpeedTrackingResource REST controller.
 *
 * @see CarSpeedTrackingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TrafficApp.class, SecurityBeanOverrideConfiguration.class })
public class CarSpeedTrackingResourceIntTest {

	@Autowired
	private CarSpeedRepository carSpeedRepository;

	@Autowired
	private MappingJackson2HttpMessageConverter jacksonMessageConverter;

	private MockMvc restCarSpeedTrackingMockMvc;

	@Autowired
	private KafkaProducerClient kafkaProducerClient;

	@Autowired
	private KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;

	@ClassRule
	public static KafkaEmbedded embeddedKafka = new KafkaEmbedded(1, true, "formatted");

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		CarSpeedTrackingResource carSpeedTrackingResource = new CarSpeedTrackingResource(carSpeedRepository, kafkaProducerClient);
		this.restCarSpeedTrackingMockMvc = MockMvcBuilders.standaloneSetup(carSpeedTrackingResource)
			.setMessageConverters(jacksonMessageConverter).build();
		// Kafka, wait until the partitions are assigned
		for (MessageListenerContainer messageListenerContainer: kafkaListenerEndpointRegistry.getListenerContainers()) {
		    ContainerTestUtils.waitForAssignment(messageListenerContainer, embeddedKafka.getPartitionsPerTopic());
		}
	}

	@Test
	@Transactional
	public void recordCarSpeed() throws Exception {
		int databaseSizeBeforeRecord = carSpeedRepository.findAll().size();

		CarSpeedCommand command = new CarSpeedCommand(35.22, 51.44, 20.4f, 2f, 0f);
		restCarSpeedTrackingMockMvc.perform(post("/v1/carspeed/record")
			.contentType(TestUtil.APPLICATION_JSON_UTF8)
			.content(TestUtil.convertObjectToJsonBytes(command)))
			.andExpect(status().isCreated());

		// Validate the CardSpeed in the database
		List<CarSpeed> carSpeedList = carSpeedRepository.findAll();
		assertThat(carSpeedList).hasSize(databaseSizeBeforeRecord + 1);
		CarSpeed testCarSpeed = carSpeedList.get(carSpeedList.size() - 1);
		assertThat(testCarSpeed.getSpeed()).isEqualTo(20.4f);
		assertThat(testCarSpeed.getHeading()).isEqualTo(2f);
		assertThat(testCarSpeed.getCellId()).isEqualTo(S2CellId.fromLatLng(S2LatLng.fromDegrees(35.22, 51.44)).id());
		assertThat(testCarSpeed.getCreated()).isLessThanOrEqualTo(Instant.now());
	}

}