const request = require('request');
const mapboxAccessToken =
  'pk.eyJ1IjoiY2hhbmRyaWthMzAiLCJhIjoiY2tqbnhxbXo4MnI1OTJ4bzd1ZnI3MDB5OCJ9.kx76YoOCLkZE_6n_pkkbiQ';

const geocode = (place, callback) => {
  console.log('Requested place: ' + place);
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapboxAccessToken}`;

  request({ url: apiUrl, json: true }, (e, { body }) => {
    if (e) {
      callback(e, undefined);
    } else {
      const data = body.features[0];
      callback(undefined, { lat: data.center[0], long: data.center[1] });
    }
  });
};

module.exports = {
  geocode,
};
