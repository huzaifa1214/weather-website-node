var request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaHV6YWlmYTEyMTQiLCJhIjoiY2p5dDMyNHQyMDJnejNocDR3Z3o3Z3ViaCJ9.yqogYpJb-FDJElM-j_aJyg&limit=1";

  request({ url, json: true }, (error, { body }={}) => {
    debugger;
    if (error) {
      callback("Unable to connect to servers", undefined);
    } else if (body.features.length === 0) {
      callback("Cannot find the coordinates.Try another location", undefined);
    } else {
      data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
