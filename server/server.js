const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors())

connectionString = "mongodb+srv://melvinichia3636:redaxe3636@helloworld.dqy4n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');

    const db = client.db('hello-world');
    const languagesCollection = db.collection('languages');

    app.get("/languages", (req, res) => {
        languagesCollection.find().toArray(function (err, result) {
            if (err) {
                res.send(err);
                console.log(err)
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            }
        })
    })
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(3001, function() {
    console.log('listening on 3001');
})