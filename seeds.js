const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1582785589",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://www.sunset.com/wp-content/uploads/clean-campsite-getty-0419-750x0-c-default.jpg",
        description: "blah blah blah"
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // Remove all comments
        Comment.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
        });
        // Add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);

                                campground.save();
                                console.log("Created new comment")
                            }
                        });
                }
            });
        });
    });

    // Add a few comments
}

module.exports = seedDB;