const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB!"))
    .catch(err => console.log(error.message));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
//         description: "This is a huge granite hill, no bathrooms. No water. beautiful granite!"
//     },
//     function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

const campgrounds = [
    { name: "Salmon Creek", image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1582785589" },
    { name: "Granite Hill", image: "https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false" },
    { name: "Mountain Goat's Rest", image: "https://www.sunset.com/wp-content/uploads/clean-campsite-getty-0419-750x0-c-default.jpg" },
]

app.get("/", function (req, res) {
    res.render("landing");
});

// INDEX route
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    });
});

// CREATE route
app.post("/campgrounds", function (req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = { name: name, image: image };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW route
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// SHOW route
app.get("/campgrounds/:id", function (req, res) {
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});

app.listen(3000, function () {
    console.log("The YelpCamp server has started!");
});