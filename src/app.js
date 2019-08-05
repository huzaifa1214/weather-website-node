const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weatherPred = require("./utils/weatherPred");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Huzaifa"
  });
});

app.get("/About", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Huzaifa"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Huzaifa",
    para: "You can ask any queries"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide adress to get Weather"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error
        });
      } else {
        weatherPred(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({
              error
            });
          } else {
            res.send({
              location,
              forecast: forecastData
            });
          }
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "Help article not found",
    title: "Error Page",
    name: "Andrew"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    error: "Page not found",
    title: "Error Page",
    name: "Andrew"
  });
});

app.listen(port, () => {
  console.log("server is up on port "+port);
});
