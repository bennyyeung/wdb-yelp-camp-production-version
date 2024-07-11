const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '667d89ad4f77d157d330965f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            latitude: cities[random1000].latitude,
            longitude: cities[random1000].longitude,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam veniam voluptatibus animi, expedita nemo praesentium, facilis iste accusantium obcaecati delectus ab possimus dicta, error a non quia voluptatum quos libero.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dojzx3lcr/image/upload/v1720124590/YelpCamp/pkwqxsp4ftbpg2fixnam.jpg',
                    filename: 'YelpCamp/pkwqxsp4ftbpg2fixnam'
                },
                {
                    url: 'https://res.cloudinary.com/dojzx3lcr/image/upload/v1720124591/YelpCamp/armmm5alqr1jcmtmpo0v.jpg',
                    filename: 'YelpCamp/armmm5alqr1jcmtmpo0v'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
    });