const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const campgrounds = [
    { name: "Salmon Creek", image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1582785589" },
    { name: "Granite Hill", image: "https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false" },
    { name: "Mountain Goat's Rest", image: "https://www.sunset.com/wp-content/uploads/clean-campsite-getty-0419-750x0-c-default.jpg" },
]

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

app.listen(3000, function () {
    console.log("The YelpCamp server has started!");
});