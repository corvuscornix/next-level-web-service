import fetch from 'isomorphic-unfetch';

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

    let json;

    try {
      json = await response.json();
    } catch (e) {
      throw new Error('No data');
    }

    if (json.error_message) {
      throw new Error(json.error_message);
    }

    const flareCountByRegion = {};
    const flareCountByClassType = {};

    json.forEach((flareData) => {
      // Increment the corresponding region count by one
      if (!flareCountByRegion[flareData.activeRegionNum]) {
        flareCountByRegion[flareData.activeRegionNum] = 1;
      } else {
        flareCountByRegion[flareData.activeRegionNum] += 1;
      }

      // Increment the corresponding class type count by one
      if (!flareCountByClassType[flareData.classType]) {
        flareCountByClassType[flareData.classType] = 1;
      } else {
        flareCountByClassType[flareData.classType] += 1;
      }
    });

    // "Flip" the flareCountByRegion into regionByFlareCount
    const regionByFlareCount = {};
    Object.keys(flareCountByRegion).forEach((region) => {
      const flareCount = flareCountByRegion[region];

      if (!regionByFlareCount[flareCount]) regionByFlareCount[flareCount] = [];

      regionByFlareCount[flareCount].push(region);
    });

    // Flip also the flareCountByClassType
    const classTypeByFlareCount = {};
    Object.keys(flareCountByClassType).forEach((region) => {
      const flareCount = flareCountByClassType[region];

      if (!classTypeByFlareCount[flareCount]) classTypeByFlareCount[flareCount] = [];

      classTypeByFlareCount[flareCount].push(region);
    });

    // The object already did the alphanumerical ordering (of keys) for us so we can just pop the last key to get the biggest flare count
    const topFlareCount = parseInt(Object.keys(regionByFlareCount).pop(), 10);
    const topRegions = regionByFlareCount[topFlareCount];

    // ...also for the class type count
    const topClassTypeCount = parseInt(Object.keys(classTypeByFlareCount).pop(), 10);
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
