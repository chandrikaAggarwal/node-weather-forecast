const request = require('request');
const geocode = require('./geocode').geocode;

// TODO: Fix: how to retrieve value
//const url = `http://api.weatherstack.com/current?access_key=${process.env['WEATHER_STACK_URL']}&query=New%20Delhi`;

const [d, p, ...rest] = process.argv;
const place = rest.join(' ');
if (!place) {
  console.log('Please provide a valid place');
} else {
  geocode(encodeURIComponent(place), (e, { lat, long }) => {
    const url = `http://api.weatherstack.com/current?access_key=b832984fc03d22cc44675eb6eba2fb83&query=${long},${lat}`;
    getWeather(url, r => {
      console.log(r);
    });
  });
}

const getWeather = (url, callback) => {
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
    } else if (!body.location.name) {
      callback(`Weather updates not found for requested ${body.request.query}`);
    } else {
      const current = body.current;
      callback(
        `It is currently ${current.temperature} degree out. There is a ${current.precip}% chance of rain.`
      );
    }
  });
};
