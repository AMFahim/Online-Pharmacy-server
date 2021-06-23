const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb').ObjectID;
require('dotenv').config()
const port = process.env.PORT || 5500
//  console.log(process.env.DB_USER);

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uy9m4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err)
  const eventCollection = client.db("onlinePharmacy").collection("medicine");


  app.get('/products', (req, res) => {
    eventCollection.find()
    .toArray((err, items) => {
      res.send(items)
      // console.log('from database', items);
    })
  })




  app.post ('/addProduct', (req, res) => {
    const newEvent = req.body;
    console.log(newEvent);
    eventCollection.insertOne(newEvent)
    .then(result => {
      // console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })

});


app.listen(port) 
