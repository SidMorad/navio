package com.rahpey.traffic.web.rest.tracking;

import java.util.List;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.rahpey.traffic.TrafficApp;
import com.rahpey.traffic.config.SecurityBeanOverrideConfiguration;
import com.rahpey.traffic.domain.model.userlocation.UserLocationHistory;
import com.rahpey.traffic.repository.UserLocationHistoryRepository;
import com.rahpey.traffic.web.rest.TestUtil;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for UserLocationTrackingResource REST controller.
 *
 * @see UserLocationTrackingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TrafficApp.class, SecurityBeanOverrideConfiguration.class })
public class UserLocationTrackingResourceIntTest {

    @Autowired
    private UserLocationHistoryRepository userLocationHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter;

    private MockMvc restUserLocationTrackingMockMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserLocationTrackingResource userLocationTrackingResource = new UserLocationTrackingResource(
                userLocationHistoryRepository);
        this.restUserLocationTrackingMockMvc = MockMvcBuilders.standaloneSetup(userLocationTrackingResource)
                .setMessageConverters(mappingJackson2HttpMessageConverter).build();
    }

    @Test
    @Transactional
    public void saveAndQueryRecentOnlineUsers() throws Exception {
        int databaseSizeBeforeSave = userLocationHistoryRepository.findAll().size();

        String mobileId = UUID.randomUUID().toString();
        UserLocationCommand cmd = new UserLocationCommand(35.7, 51.5, mobileId);
        restUserLocationTrackingMockMvc.perform(post("/v1/usertrack/save").contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(cmd))).andExpect(status().isCreated());

        // Validate the UserLocation in the database
        List<UserLocationHistory> userLocationList = userLocationHistoryRepository.findAll();
        assertThat(userLocationList).hasSize(databaseSizeBeforeSave + 1);
        UserLocationHistory testUserLocation = userLocationList.get(userLocationList.size() - 1);
        assertThat(testUserLocation.getMobileId()).isEqualTo(mobileId);
        assertThat(testUserLocation.getLatitude()).isEqualTo(35.7);
        assertThat(testUserLocation.getLongitude()).isEqualTo(51.5);

        // Test query end-point founded
        String southWest = "35.63748791665544,51.44845962524414";
        String northEast = "35.76239338462889,51.55145645141602";
        restUserLocationTrackingMockMvc.perform(get("/v1/usertrack/query/" + southWest + "/" + northEast))
                .andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].latitude").value(hasItem(testUserLocation.getLatitude().doubleValue())))
                .andExpect(jsonPath("$.[*].longitude").value(hasItem(testUserLocation.getLongitude().doubleValue())));

        // Test query end-point not found
        String southWest2 = "-35.6,-51.4";
        String northEast2 = "-35.7,-51.5";
        restUserLocationTrackingMockMvc.perform(get("/v1/usertrack/query/" + southWest2 + "/" + northEast2))
                .andExpect(status().isNoContent());
    }

}