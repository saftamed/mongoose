const database = require("./database");
const Person = require("./models/person");

//Create and Save a Record of a Model:

let p1 = new Person({
  name: "safta amine med",
  age: 27,
  favoriteFoods: ["pizza"],
});
p1.save(function (err, data) {
  console.log(data);
});

//Create Many Records with model.create()

let persons = [
  {
    name: "ali",
    age: 31,
    favoriteFoods: ["pizza"],
  },
  {
    name: "hamma",
    age: 29,
    favoriteFoods: ["chawarma", "burritos"],
  },
  {
    name: "Mary",
    age: 25,
    favoriteFoods: ["ma9loub"],
  },
];
Person.create(persons, function (err, data) {
  console.log(data);
});

//Use model.find() to Search Your Database

Person.find({ name: "ali" }, function (err, data) {
  console.log(data);
});

//Use model.findOne() to Return a Single Matching Document from Your Database

function searchByFood(search) {
  Person.findOne({ favoriteFoods: { $regex: search } }, function (err, docs) {
    console.log(docs);
  });
}
searchByFood("burritos");

//Use model.findById() to Search Your Database By _id

function findByPersonId(personId) {
  Person.findById(personId, function (err, docs) {
    console.log(docs);
  });
}
findByPersonId("624ade0bb6b6ef72fbdd3edb");

//Perform Classic Updates by Running Find, Edit, then Save

function findPersonAndUpdate(personId) {
  Person.findById(personId, function (err, docs) {
    docs.favoriteFoods.push("hamburgr");
    docs.save().then((doc) => {
      console.log(doc);
    });
  });
}

findPersonAndUpdate("624ade0bb6b6ef72fbdd3edb");

//Perform New Updates on a Document Using model.findOneAndUpdate()

function findPersonAndUpdate(name) {
  Person.findOneAndUpdate(
    { name },
    { age: 49 },
    {
      new: true,
    }
  ).then((doc) => {
    console.log(doc);
  });
}
findPersonAndUpdate("hamma");

//Delete One Document Using model.findByIdAndRemove

function findPersonAndRemove(personId) {
  Person.findByIdAndRemove(personId).then((doc) => {
    console.log(doc);
  });
}
findPersonAndRemove("624adb938710e1915f0b3673");

//MongoDB and Mongoose - Delete Many Documents with model.remove()

Person.remove({ name: "Mary" }).then((data) => {
  console.log(data.deletedCount);
});

//Chain Search Query Helpers to Narrow Search Results

function done(err, data) {
  console.log(data);
}
Person.find({ favoriteFoods: { $regex: "burritos" } })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec(done);
