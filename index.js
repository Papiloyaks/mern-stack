const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const path = require("path");
const User = require("./models/models.user")

const app = express();
const port = 5100

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Mount the user router
const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);






 let URI = "mongodb+srv://papiloyaks65:papilo45@cluster0.0lobeff.mongodb.net/Yaks_db?retryWrites=true&w=majority&appName=Cluster0";

 mongoose.connect(URI)
 .then(() => {
  console.log("Connected to MongoDB");
 })
 .catch(err => {
   console.error("Error connecting to MongoDB:", err);
  });
  
  
  // Use our roads (routes)
  
  
  
  // Home page
  app.get("/", (req, res) => res.render("index"));
  
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




// const nigeriaPostalCodes = [

//   { city: 'Lagos', code: '100001' },
//   { city: 'Abuja', code: '900001' },
//   { city: 'Port Harcourt', code: '500001' },
//   { city: 'Kano', code: '700001' },
//   { city: 'Ibadan', code: '200001' }
// ];


// const movieList = [
//   { title: 'Inception', director: 'Christopher Nolan', year: 2010, },
//   { title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', year: 1999, },
//   { title: 'Interstellar', director: 'Christopher Nolan', year: 2014, },
//   { title: 'Parasite', director: 'Bong Joon-ho', year: 2019, },
//   { title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972, }
// ];




// const allSongs = [
//   { id:1, name:'Song 1', artist:'Artist 1', genre:'Genre 1', year:2021 },
//   { id:2, name:'Song 2', artist:'Artist 2', genre:'Genre 2', year:2020 },
//   { id:3, name:'Song 3', artist:'Artist 3', genre:'Genre 3', year:2019 },
//   { id:4, name:'Song 4', artist:'Artist 4', genre:'Genre 4', year:2018 },
//   { id:5, name:'Song 5', artist:'Artist 5', genre:'Genre 5', year:2017 }
// ];






// app.get('/songs', (req, res) => {
//       res.send(allSongs);
//     });

//     app.get('/movies', (req, res) => {
//   res.send(movieList)
// });

// app.get('/users', (req, res) => {
//   res.send(nigeriaPostalCodes)
// });


// app.get('/html', (req, res) => {
//   res.sendFile(`${__dirname}/test.html`)
// });





app.listen(port, () => {
  console.log(`server started at port ${port}`);
});