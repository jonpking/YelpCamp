const express = require("express");
const app = express();


app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    const campgrounds = [
        { name: "Salmon Creek", image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1582785589" },
        { name: "Granite Hill", image: "https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false" },
        { name: "Mountain Goat's Rest", image: "https://www.sunset.com/wp-content/uploads/clean-campsite-getty-0419-750x0-c-default.jpg" },
    ]
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, function () {
    console.log("The YelpCamp server has started!");
});