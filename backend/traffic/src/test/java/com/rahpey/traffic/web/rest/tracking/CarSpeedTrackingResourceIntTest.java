package com.rahpey.traffic.web.rest.tracking;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.geometry.S2CellId;
import com.google.common.geometry.S2LatLng;
import com.rahpey.traffic.TrafficApp;
import com.rahpey.traffic.config.SecurityBeanOverrideConfiguration;
import com.rahpey.traffic.domain.model.car.CarSpeed;
import com.rahpey.traffic.repository.CarSpeedRepository;
import com.rahpey.traffic.web.rest.TestUtil;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.util.List;


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

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		CarSpeedTrackingResource carSpeedTrackingResource = new CarSpeedTrackingResource(carSpeedRepository);
		this.restCarSpeedTrackingMockMvc = MockMvcBuilders.standaloneSetup(carSpeedTrackingResource)
			.setMessageConverters(jacksonMessageConverter).build();
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