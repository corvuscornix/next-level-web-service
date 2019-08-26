import fetch from 'isomorphic-unfetch';
import { median } from '../utils';

/**
 * Fetch asteroid information from NASA NEO API. Uses query parameters @startDate
 * and @endDate to limit the period.
 *
 * Returns the following information in a JSON object:
 *
 * a) @closestAsteroid - information of the asteroid that passed closest to Earth
 *
 * b) @medianAsteroidMagnitude - the median absolute magnitude of all asteroids measured in the feed
 *
 * c) @avgMagnitudeOfHazardousAsteroids - the mean absolute magnitude of all asteroids considered potentially
 * hazardous
 *
 * or @error message if API or function fails.
*/

export default async function asteroids(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`);

    let json;

    try {
      json = await response.json();
    } catch (e) {
      throw new Error('No data');
    }

    if (json.error_message) {
      throw new Error(json.error_message);
    }

    let closestAsteroidDistance = Infinity;
    let closestAsteroidData = null;

    let hazardousTotalCount = 0;
    let hazardousMagnitudesSum = 0;

    const magnitudes = [];

    // Iterate through all the object data and collect information
    Object.values(json.near_earth_objects).forEach((objectsPerDate) => {
      objectsPerDate.forEach((objectData) => {
        magnitudes.push(objectData.absolute_magnitude_h);

        if (objectData.is_potentially_hazardous_asteroid) {
          hazardousTotalCount += 1;
          hazardousMagnitudesSum += objectData.absolute_magnitude_h;
        }

        objectData.close_approach_data.forEach((closeApproachData) => {
          if (closeApproachData.miss_distance.kilometers < closestAsteroidDistance) {
            closestAsteroidDistance = closeApproachData.miss_distance.kilometers;
            closestAsteroidData = objectData;
          }
        });
      });
    });

    res.json({
      closestAsteroid: {
        name: closestAsteroidData.name,
        distanceInKm: closestAsteroidDistance,
        nasaUrl: closestAsteroidData.nasa_jpl_url,
      },
      avgMagnitudeOfHazardousAsteroids: hazardousMagnitudesSum / hazardousTotalCount,
      medianAsteroidMagnitude: median(magnitudes),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
}
