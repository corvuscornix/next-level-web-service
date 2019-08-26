/* eslint-disable no-undef */
import fetch from 'isomorphic-unfetch';
import asteroids from '../../api/asteroids';

jest.mock('isomorphic-unfetch');

test('asteroids error message', async () => {
  const mockFetchData = { error_message: 'I failed' };

  // Mock the fetch call
  fetch.mockImplementation(() => ({ json: () => mockFetchData }));

  let returnData = null;

  await asteroids(
    // Mock request object
    { query: { startDate: null, endData: null } },

    // Mock response object
    { json: (data) => { returnData = data; } },
  );

  expect(returnData.error).toBe(mockFetchData.error_message);
});

/*-------------------------------------------------------*/

test('test return data', async () => {
  const closestAsteroidData = {
    absolute_magnitude_h: 100,
    name: "I'm closest",
    nasa_jpl_url: 'www.nasa.com',
    close_approach_data: [{
      miss_distance: {
        kilometers: 50,
      },
    }],
  };

  const mockFetchData = {
    near_earth_objects: {
      '2019-08-26': [
        {
          absolute_magnitude_h: 300,
          is_potentially_hazardous_asteroid: true,
          close_approach_data: [{
            miss_distance: {
              kilometers: 100,
            },
          }],
        },
      ],

      '2019-08-27': [
        closestAsteroidData,
      ],

      '2019-08-28': [
        {
          absolute_magnitude_h: 200,
          is_potentially_hazardous_asteroid: true,
          close_approach_data: [{
            miss_distance: {
              kilometers: 300,
            },
          }],
        },
      ],
    },
  };

  // Mock the fetch call
  fetch.mockImplementation(() => ({ json: () => mockFetchData }));

  let returnData = null;

  await asteroids(
    // Mock request object
    { query: { startDate: null, endData: null } },

    // Mock response object
    { json: (data) => { returnData = data; } },
  );

  // Check closest asteroid information
  expect(returnData.closestAsteroid.name).toBe(closestAsteroidData.name);
  expect(returnData.closestAsteroid.nasaUrl).toBe(closestAsteroidData.nasa_jpl_url);

  // Check average magnitude of hazardous asteroids
  expect(returnData.medianAsteroidMagnitude).toBe(200);

  // Check median asteroid magnitude
  expect(returnData.avgMagnitudeOfHazardousAsteroids).toBe(250);
});
