import fetch from 'isomorphic-unfetch';
import { median } from '../utils';

/**
 * Fetch solar flare information from NASA DONKI API. Uses query parameters @startDate
 * and @endDate to limit the period.
 *
 * Returns following information in a JSON object:
 *
 * a) @regionsWithMostSolarFlares - an array of regions with the biggest number of solar flares during the period
 *
 * b) @mostCommonClassType - the most common class type of solar flare during the period
 *
 * or @error message if API or function fails.
 *
*/

export default async function solarflares(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const response = await fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.API_KEY}`);
    const json = await response.json();

    if (json.error_message) {
      throw new Error(json.error_message);
    }

    const flareCountByRegion = {};
    const flareCountByClassType = {};

    json.forEach((item) => {
      if (!flareCountByRegion[item.activeRegionNum]) {
        flareCountByRegion[item.activeRegionNum] = 1;
      } else {
        flareCountByRegion[item.activeRegionNum] += 1;
      }

      if (!flareCountByClassType[item.classType]) {
        flareCountByClassType[item.classType] = 1;
      } else {
        flareCountByClassType[item.classType] += 1;
      }
    });

    const regionByFlareCount = {};
    Object.keys(flareCountByRegion).forEach((region) => {
      const flareCount = flareCountByRegion[region];

      if (!regionByFlareCount[flareCount]) regionByFlareCount[flareCount] = [];

      regionByFlareCount[flareCount].push(region);
    });

    const classTypeByFlareCount = {};
    Object.keys(flareCountByClassType).forEach((region) => {
      const flareCount = flareCountByClassType[region];

      if (!classTypeByFlareCount[flareCount]) classTypeByFlareCount[flareCount] = [];

      classTypeByFlareCount[flareCount].push(region);
    });

    const topFlareCount = Object.keys(regionByFlareCount).pop();
    const topRegions = regionByFlareCount[topFlareCount];

    const topClassTypeCount = Object.keys(classTypeByFlareCount).pop();
    const topClassTypeName = classTypeByFlareCount[topClassTypeCount];

    res.json({
      regionsWithMostSolarFlares: {
        count: topFlareCount,
        regions: topRegions,
      },
      mostCommonClassType: {
        count: topClassTypeCount,
        names: topClassTypeName,
      },
    });
  } catch (e) {
    res.json({ error: e.message });
  }
}
