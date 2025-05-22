import axios from 'axios';

const NODE_API = 'http://localhost:2000/api/drill-data';

export const fetchGeoFeatures = async () => {
  // const res = await axios.get(`${NODE_API}/features`);
  const geoData = {

    "type": "FeatureCollection",

    "name": "Faraday_CC_collars",

    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

    "features": [

      { "type": "Feature", "properties": { "Hole_ID": "A-11", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Magma", "Total depth": 441.96, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 550082.15, "Northing": 3623730.41, "Elevation": 1350.57 }, "geometry": { "type": "Point", "coordinates": [-110.465383605737046, 32.750284432427939] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-1", "Azimuth": 51.23, "Inclination": -86.33, "Borehole type": "Diamond Drill", "Company": "AMT", "Total depth": 610.21, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549033.67, "Northing": 3623351.82, "Elevation": 1286.76 }, "geometry": { "type": "Point", "coordinates": [-110.476595471921982, 32.74691665473074] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-1R", "Azimuth": 336.0, "Inclination": -60.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 304.8, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548963.5, "Northing": 3623289.45, "Elevation": 1267.73 }, "geometry": { "type": "Point", "coordinates": [-110.477347751995964, 32.746357179992231] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-2", "Azimuth": 240.05, "Inclination": -67.32, "Borehole type": "Diamond Drill", "Company": "AMT", "Total depth": 541.33, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549103.62, "Northing": 3623421.92, "Elevation": 1307.58 }, "geometry": { "type": "Point", "coordinates": [-110.475845122428254, 32.747545862044802] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-2R", "Azimuth": 21.0, "Inclination": -70.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 304.8, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548963.68, "Northing": 3623298.7, "Elevation": 1267.21 }, "geometry": { "type": "Point", "coordinates": [-110.47734534348912, 32.746440610384361] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-3", "Azimuth": 233.31, "Inclination": -79.96, "Borehole type": "Diamond Drill", "Company": "AMT", "Total depth": 556.41, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549102.63, "Northing": 3623420.07, "Elevation": 1307.58 }, "geometry": { "type": "Point", "coordinates": [-110.475855787488186, 32.747529218563855] } },

      { "type": "Feature", "properties": { "Hole_ID": "AE-3R", "Azimuth": 350.0, "Inclination": -50.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 228.6, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549036.8, "Northing": 3623347.61, "Elevation": 1280.95 }, "geometry": { "type": "Point", "coordinates": [-110.476562284362501, 32.746878539464952] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-1", "Azimuth": 306.5, "Inclination": -40.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 217.63, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548533.75, "Northing": 3623991.14, "Elevation": 1224.99 }, "geometry": { "type": "Point", "coordinates": [-110.481898240651631, 32.752705727802329] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-2", "Azimuth": 307.0, "Inclination": -58.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 307.85, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548533.76, "Northing": 3623990.84, "Elevation": 1224.99 }, "geometry": { "type": "Point", "coordinates": [-110.481898149571734, 32.752703021251392] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-3", "Azimuth": 228.0, "Inclination": -65.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 252.98, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548516.63, "Northing": 3624116.21, "Elevation": 1275.19 }, "geometry": { "type": "Point", "coordinates": [-110.482074462086175, 32.753834660216285] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-4", "Azimuth": 83.0, "Inclination": -59.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 338.63, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548606.89, "Northing": 3623597.49, "Elevation": 1295.74 }, "geometry": { "type": "Point", "coordinates": [-110.48113807988841, 32.749151630246757] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-5", "Azimuth": 125.0, "Inclination": -55.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 241.1, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548921.98, "Northing": 3623408.76, "Elevation": 1254.72 }, "geometry": { "type": "Point", "coordinates": [-110.477784655141761, 32.747435247372458] } },

      { "type": "Feature", "properties": { "Hole_ID": "AH-6", "Azimuth": 101.0, "Inclination": -55.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 213.97, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548921.37, "Northing": 3623407.17, "Elevation": 1254.93 }, "geometry": { "type": "Point", "coordinates": [-110.47779125000126, 32.747420932117876] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-1", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548788.76, "Northing": 3625227.53, "Elevation": 1391.41 }, "geometry": { "type": "Point", "coordinates": [-110.479111158746036, 32.76384711939675] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-1a", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549036.21, "Northing": 3625331.52, "Elevation": 1391.41 }, "geometry": { "type": "Point", "coordinates": [-110.476463885843302, 32.764774134711637] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-2", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549769.03, "Northing": 3624922.99, "Elevation": 1414.27 }, "geometry": { "type": "Point", "coordinates": [-110.468662095559026, 32.761056124992642] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-3", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 551064.18, "Northing": 3624284.31, "Elevation": 1354.84 }, "geometry": { "type": "Point", "coordinates": [-110.454870613506287, 32.755235636808422] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-4", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 550107.15, "Northing": 3622796.25, "Elevation": 1421.89 }, "geometry": { "type": "Point", "coordinates": [-110.465167096449463, 32.741856843001123] } },

      { "type": "Feature", "properties": { "Hole_ID": "AR-4a", "Azimuth": 360.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Newmont", "Total depth": 0.0, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 550122.22, "Northing": 3622817.7, "Elevation": 1423.42 }, "geometry": { "type": "Point", "coordinates": [-110.465005092331324, 32.742049643224071] } },

      { "type": "Feature", "properties": { "Hole_ID": "B-20", "Azimuth": 0.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Magma", "Total depth": 1068.02, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548729.02, "Northing": 3623955.54, "Elevation": 1242.37 }, "geometry": { "type": "Point", "coordinates": [-110.479815658112031, 32.752375968227177] } },

      { "type": "Feature", "properties": { "Hole_ID": "B-24", "Azimuth": 0.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Magma", "Total depth": 1053.09, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "Y", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548290.58, "Northing": 3624310.31, "Elevation": 1280.77 }, "geometry": { "type": "Point", "coordinates": [-110.484477423353098, 32.755595462641971] } },

      { "type": "Feature", "properties": { "Hole_ID": "B-29", "Azimuth": 0.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Magma", "Total depth": 1090.88, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548418.44, "Northing": 3624127.32, "Elevation": 1304.15 }, "geometry": { "type": "Point", "coordinates": [-110.483122045858153, 32.753939203909098] } },

      { "type": "Feature", "properties": { "Hole_ID": "B-30", "Azimuth": 0.0, "Inclination": -90.0, "Borehole type": "Diamond Drill", "Company": "Magma", "Total depth": 900.38, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548431.92, "Northing": 3624351.33, "Elevation": 1321.62 }, "geometry": { "type": "Point", "coordinates": [-110.4829664734104, 32.755959262016454] } },

      { "type": "Feature", "properties": { "Hole_ID": "B24-1R", "Azimuth": 69.0, "Inclination": -40.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 121.92, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548244.2, "Northing": 3624331.21, "Elevation": 1279.03 }, "geometry": { "type": "Point", "coordinates": [-110.484971447251752, 32.75578602403791] } },

      { "type": "Feature", "properties": { "Hole_ID": "B24-2R", "Azimuth": 89.0, "Inclination": -35.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 121.92, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548248.58, "Northing": 3624328.45, "Elevation": 1279.23 }, "geometry": { "type": "Point", "coordinates": [-110.484924833725259, 32.755760935660568] } },

      { "type": "Feature", "properties": { "Hole_ID": "B24-3R", "Azimuth": 120.0, "Inclination": -55.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 97.54, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 548251.75, "Northing": 3624329.4, "Elevation": 1279.37 }, "geometry": { "type": "Point", "coordinates": [-110.484890944407596, 32.755769365915619] } },

      { "type": "Feature", "properties": { "Hole_ID": "BG-1R", "Azimuth": 30.0, "Inclination": -30.0, "Borehole type": "Reverse Circulation", "Company": "AMT", "Total depth": 243.84, "Drilled Location": "Surface", "Year Drilled": null, "Relogged": "N", "Coordinates.Grid": "WGS 84 / UTM zone 12N", "Easting": 549127.81, "Northing": 3623277.08, "Elevation": 1294.5 }, "geometry": { "type": "Point", "coordinates": [-110.475594570942789, 32.746238272313498] } }
    ]
  }

  return geoData;
};

// export const fetchOneFeature = async (id) => {
//   const res = await axios.get(`${NODE_API}/features/${id}`);
//   return res.data;
// };

// export const createFeature = async (data) => {
//   const res = await axios.post(`${NODE_API}/features`, data);
//   return res.data;
// };

// export const updateFeature = async (id, data) => {
//   const res = await axios.put(`${NODE_API}/features/${id}`, data);
//   return res.data;
// };

// export const deleteFeature = async (id) => {
//   const res = await axios.delete(`${NODE_API}/features/${id}`);
//   return res.data;
// };
