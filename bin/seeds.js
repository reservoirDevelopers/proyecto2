// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/filmRecommendations', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    email: "alice@email.com",
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    city: "Madrid",
    country: "Spain",
    gender: 'female',
    status: "Active",
    confirmationCode: 1234,
    image: 'uploads/alice.jpg',
    friends: [],
  },
  {
    email: "bob@email.com",
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    city: "Barcelona",
    country: "Spain",
    gender: 'female',
    status: "Active",
    confirmationCode: 5678,
    image: 'uploads/bob.jpg',
    friends: [],
  },
  ,
  {
    email: "natalia@gmail.com",
    username: "natalia",
    password: bcrypt.hashSync("natalia", bcrypt.genSaltSync(bcryptSalt)),
    city: "La Coruña",
    country: "Spain",
    gender: 'prefer not to say',
    status: "Active",
    confirmationCode: 8901,
    image: 'uploads/natalia.jpg',
    friends: [],
  }  ,
  {
    email: "brais@gmail.com",
    username: "brais",
    password: bcrypt.hashSync("brais", bcrypt.genSaltSync(bcryptSalt)),
    city: "Vigo",
    country: "Spain",
    gender: 'prefer not to say',
    status: "Active",
    confirmationCode: 8902,
    image: 'uploads/brais.jpg',
    friends: [],
  },
  {
    email: "marta@gmail.com",
    username: "marta",
    password: bcrypt.hashSync("marta", bcrypt.genSaltSync(bcryptSalt)),
    city: "Madrid",
    country: "Spain",
    gender: 'prefer not to say',
    status: "Active",
    confirmationCode: 8903,
    image: 'uploads/marta.jpg',
    friends: [],
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})