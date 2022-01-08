const { MongoClient, ObjectID } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";


MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error);
  }

  const db = client.db(databaseName);
  ///////////////////////////// Create  /////////////////////////////////
  // db.collection("users").insertOne({
  //   name: "hamzaig",
  //   age: 25,
  // }, (error, result) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log(result.ops);
  // })

  // db.collection("users").insertMany([
  //   {
  //     name: "ali",
  //     age: 27,
  //   },
  //   {
  //     name: "azeez",
  //     age: 22
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log(result.ops);
  // })

  // db.collection("tasks").insertMany([
  //   {
  //     description: "pay bills",
  //     completed: true,
  //   },
  //   {
  //     description: "pay load",
  //     completed: false,
  //   },
  //   {
  //     description: "loaded",
  //     completed: true,
  //   },
  // ], (error, result) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log(result.ops);
  // })
  ///////////////////////////// Read  /////////////////////////////////

  // db.collection("users").findOne({ _id: new ObjectID("61d36a6281cd6647301fa379") }, (error, document) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log(document);
  // })

  // db.collection("users").find({ age: 25 }).toArray((error, users) => {
  //   console.log(users);
  // })
  // db.collection("users").find({ age: 25 }).count((error, users) => {
  //   console.log(users);
  // })

  ///////////////////////////// Update  /////////////////////////////////

  // db.collection("users").updateOne({ name: "hamzaig" }, {
  //   $set: {
  //     age: 26
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // })

  // db.collection("users").updateOne({ name: "hamzaig" }, {
  //   $inc: {
  //     age: 5
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // })


  // db.collection("users").updateMany({ name: "hamzaig" }, {
  //   $inc: {
  //     age: 5
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // })

  ///////////////////////////// Delete  /////////////////////////////////

  // db.collection("users").deleteOne({ name: "ali" }).then(result => {
  //   console.log(result);
  // }).catch(err => {
  //   console.log(err);
  // })

  // db.collection("users").deleteMany({ name: "hamzaig" }).then(result => {
  //   console.log(result);
  // }).catch(err => {
  //   console.log(err);
  // })


})