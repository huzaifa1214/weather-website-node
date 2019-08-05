var request = require("request");

const weatherPred = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e0ecc9451f3f44314bbb98f09f22964e/" +
    longitude +
    "," +
    latitude +
    "?units=si";
  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback("Unable to connect to web server", undefined);
    } else if (body.error) {
      callback("Cannot find the location.Try Again!", undefined);
    } else {
      
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. High Temperature will be: '+body.daily.data[0].temperatureHigh+' and Low Temperature will be '+body.daily.data[0].temperatureLow+' today.There is a ' + body.currently.precipProbability + '% chance of rain.');
    }
  });
};

module.exports = weatherPred;
