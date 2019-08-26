import fetch from 'isomorphic-unfetch';
import solarflares from '../../api/solarflares';

jest.mock('isomorphic-unfetch');

test('solarflares error message', async () => {
  const mockFetchData = { error_message: 'I failed' };

  // mock a fetch call that returns an error message
  fetch.mockImplementation(() => ({ json: () => mockFetchData }));

  let returnData = null;

  await solarflares(
    // mock request object
    { query: { startDate: null, endData: null } },

    // mock response object
    { json: (data) => { returnData = data; } },
  );

  expect(returnData.error).toBe(mockFetchData.error_message);
});

/*-------------------------------------------------------*/

test('test return data', async () => {
  const mockFetchData = [
    {
      activeRegionNum: '123',
      classType: 'abc',
    },
    {
      activeRegionNum: '456',
      classType: 'def',
    },
    {
      activeRegionNum: '123',
      classType: 'ghi',
    },
    {
      activeRegionNum: '678',
      classType: 'def',
    },
    {
      activeRegionNum: '456',
      classType: 'ghi',
    },
    {
      activeRegionNum: '789',
      classType: 'def',
    },
  ];

  // Mock the fetch call
  fetch.mockImplementation(() => ({ json: () => mockFetchData }));

  let returnData = null;

  await solarflares(
    // Mock request object
    { query: { startDate: null, endData: null } },

    // Mock response object
    { json: (data) => { returnData = data; } },
  );


  // Confirm that regions with most solar flares information is correct
  expect(returnData.regionsWithMostSolarFlares.count).toBe(2);
  expect(returnData.regionsWithMostSolarFlares.regions).toEqual(['123', '456']);

  // Confirm that most common class type information is correct
  expect(returnData.mostCommonClassType.count).toBe(3);
  expect(returnData.mostCommonClassType.names).toEqual(['def']);
});
