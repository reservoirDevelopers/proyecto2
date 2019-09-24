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

let movies = [
  {"_id":"5d8a017240c89c66768d3149","genre":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":878,"name":"Science Fiction"}],"cast":[],"country":[],"APIid":"429617","title":"Spider-Man: Far from Home","year":"2019-06-28","poster":"/lcq8dVxeeOqHvvgcte707K0KVx5.jpg","duration":129,"sinopsis":"Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.","created_at":"2019-09-24T11:43:46.471Z","updated_at":"2019-09-24T11:43:46.471Z","__v":0},
  {"_id":"5d8a02f2320b576686968466","genre":[{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":18,"name":"Drama"}],"cast":[],"country":[],"APIid":"429203","title":"The Old Man & the Gun","year":"2018-09-27","poster":"/a4BfxRK8dBgbQqbRxPs8kmLd8LG.jpg","duration":93,"sinopsis":"The true story of Forrest Tucker, from his audacious escape from San Quentin at the age of 70 to an unprecedented string of heists that confounded authorities and enchanted the public. Wrapped up in the pursuit are a detective, who becomes captivated with Forrest’s commitment to his craft, and a woman, who loves him in spite of his chosen profession.","created_at":"2019-09-24T11:50:10.647Z","updated_at":"2019-09-24T11:50:10.647Z","__v":0},
  {"_id":"5d8a02fb320b576686968468","genre":[{"id":27,"name":"Horror"},{"id":35,"name":"Comedy"}],"cast":[],"country":[],"APIid":"474350","title":"It Chapter Two","year":"2019-09-04","poster":"/zfE0R94v1E8cuKAerbskfD3VfUt.jpg","duration":169,"sinopsis":"27 years after overcoming the malevolent supernatural entity Pennywise, the former members of the Losers' Club, who have grown up and moved away from Derry, are brought back together by a devastating phone call.","created_at":"2019-09-24T11:50:19.170Z","updated_at":"2019-09-24T11:50:19.170Z","__v":0},
  {"_id":"5d8a0305320b57668696846a","genre":[{"id":28,"name":"Action"},{"id":53,"name":"Thriller"}],"cast":[],"country":[],"APIid":"522938","title":"Rambo: Last Blood","year":"2019-09-19","poster":"/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg","duration":100,"sinopsis":"When his housekeeper’s granddaughter is kidnapped, Rambo crosses the U.S.-Mexican border to bring her home but finds himself up against the full might of one of Mexico’s most ruthless cartels.","created_at":"2019-09-24T11:50:29.614Z","updated_at":"2019-09-24T11:50:29.614Z","__v":0},
  {"_id":"5d8a030e320b57668696846c","genre":[{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":18,"name":"Drama"},{"id":36,"name":"History"}],"cast":[],"country":[],"APIid":"540901","title":"Hustlers","year":"2019-09-12","poster":"/zBhv8rsLOfpFW2M5b6wW78Uoojs.jpg","duration":107,"sinopsis":"A crew of savvy former strip club employees band together to turn the tables on their Wall Street clients.","created_at":"2019-09-24T11:50:38.500Z","updated_at":"2019-09-24T11:50:38.500Z","__v":0}
]

let reviews = [
  {"_id":"5d8a017240c89c66768d314a","user":"5d8a0159355bce661226fea4","movie":"5d8a017240c89c66768d3149","score":5,"created_at":"2019-09-24T11:43:46.597Z","updated_at":"2019-09-24T11:43:46.597Z","__v":0},
  {"_id":"5d8a02b2320b576686968465","user":"5d8a0159355bce661226fea5","movie":"5d8a017240c89c66768d3149","score":7,"created_at":"2019-09-24T11:49:06.491Z","updated_at":"2019-09-24T11:49:06.491Z","__v":0},
  {"_id":"5d8a02f2320b576686968467","user":"5d8a0159355bce661226fea5","movie":"5d8a02f2320b576686968466","score":8,"created_at":"2019-09-24T11:50:10.656Z","updated_at":"2019-09-24T11:50:10.656Z","__v":0},
  {"_id":"5d8a02fb320b576686968469","user":"5d8a0159355bce661226fea5","movie":"5d8a02fb320b576686968468","score":9,"created_at":"2019-09-24T11:50:19.178Z","updated_at":"2019-09-24T11:50:19.178Z","__v":0},
  {"_id":"5d8a0305320b57668696846b","user":"5d8a0159355bce661226fea5","movie":"5d8a0305320b57668696846a","score":8,"created_at":"2019-09-24T11:50:29.620Z","updated_at":"2019-09-24T11:50:29.620Z","__v":0},
  {"_id":"5d8a030e320b57668696846d","user":"5d8a0159355bce661226fea5","movie":"5d8a030e320b57668696846c","score":9,"created_at":"2019-09-24T11:50:38.504Z","updated_at":"2019-09-24T11:50:38.504Z","__v":0},
  {"_id":"5d8a0343320b57668696846e","user":"5d8a0159355bce661226fea4","movie":"5d8a02f2320b576686968466","score":9,"created_at":"2019-09-24T11:51:31.033Z","updated_at":"2019-09-24T11:51:31.033Z","__v":0},
  {"_id":"5d8a0349320b57668696846f","user":"5d8a0159355bce661226fea4","movie":"5d8a02fb320b576686968468","score":9,"created_at":"2019-09-24T11:51:37.260Z","updated_at":"2019-09-24T11:51:37.260Z","__v":0},
  {"_id":"5d8a0350320b576686968470","user":"5d8a0159355bce661226fea4","movie":"5d8a0305320b57668696846a","score":8,"created_at":"2019-09-24T11:51:44.584Z","updated_at":"2019-09-24T11:51:44.584Z","__v":0},
  {"_id":"5d8a0357320b576686968471","user":"5d8a0159355bce661226fea4","movie":"5d8a030e320b57668696846c","score":9,"created_at":"2019-09-24T11:51:51.693Z","updated_at":"2019-09-24T11:51:51.693Z","__v":0},
  {"_id":"5d8a037a320b576686968472","user":"5d8a0159355bce661226fea7","movie":"5d8a017240c89c66768d3149","score":2,"created_at":"2019-09-24T11:52:26.499Z","updated_at":"2019-09-24T11:52:26.499Z","__v":0},
  {"_id":"5d8a0381320b576686968473","user":"5d8a0159355bce661226fea7","movie":"5d8a02f2320b576686968466","score":1,"created_at":"2019-09-24T11:52:33.650Z","updated_at":"2019-09-24T11:52:33.650Z","__v":0},
  {"_id":"5d8a0388320b576686968474","user":"5d8a0159355bce661226fea7","movie":"5d8a02fb320b576686968468","score":7,"created_at":"2019-09-24T11:52:40.610Z","updated_at":"2019-09-24T11:52:40.610Z","__v":0},
  {"_id":"5d8a0395320b576686968475","user":"5d8a0159355bce661226fea7","movie":"5d8a0305320b57668696846a","score":4,"created_at":"2019-09-24T11:52:53.848Z","updated_at":"2019-09-24T11:52:53.848Z","__v":0},
  {"_id":"5d8a039d320b576686968476","user":"5d8a0159355bce661226fea7","movie":"5d8a030e320b57668696846c","score":3,"created_at":"2019-09-24T11:53:01.385Z","updated_at":"2019-09-24T11:53:01.385Z","__v":0},
  {"_id":"5d8a03bc320b576686968477","user":"5d8a0159355bce661226fea6","movie":"5d8a017240c89c66768d3149","score":5,"created_at":"2019-09-24T11:53:32.129Z","updated_at":"2019-09-24T11:53:32.129Z","__v":0},
  {"_id":"5d8a03cc320b576686968478","user":"5d8a0159355bce661226fea6","movie":"5d8a02f2320b576686968466","score":7,"created_at":"2019-09-24T11:53:48.567Z","updated_at":"2019-09-24T11:53:48.567Z","__v":0},
  {"_id":"5d8a03d8320b576686968479","user":"5d8a0159355bce661226fea6","movie":"5d8a02fb320b576686968468","score":5,"created_at":"2019-09-24T11:54:00.189Z","updated_at":"2019-09-24T11:54:00.189Z","__v":0},
  {"_id":"5d8a03e3320b57668696847a","user":"5d8a0159355bce661226fea6","movie":"5d8a0305320b57668696846a","score":3,"created_at":"2019-09-24T11:54:11.132Z","updated_at":"2019-09-24T11:54:11.132Z","__v":0},
  {"_id":"5d8a03f1320b57668696847b","user":"5d8a0159355bce661226fea6","movie":"5d8a030e320b57668696846c","score":4,"created_at":"2019-09-24T11:54:25.253Z","updated_at":"2019-09-24T11:54:25.253Z","__v":0}
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