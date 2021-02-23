//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors';
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1154841",
    key: "60641f221f65ae787e77",
    secret: "7fb4661702cc5c7f39d7",
    cluster: "us3",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(cors());


// DB config
const connection_url = 'mongodb+srv://admin:EzPP2iJgLZxb71XX@cluster0.z7stg.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useCreateIndex: true, 
    useNewUrlParser: true, //parses connection_url
    useUnifiedTopology: true
});
// ???


const db = mongoose.connection

db.once('open',()=>{
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) =>{
        console.log("A change occured",change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log('Error triggering Pusher')
        }
    });
});

//api routes
//200 means ok -- status code, in the range of 200, request is working and its sayig okay
app.get("/", (req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data) //200 instead on 201 since we are downloading data not creating data
        }
    })
})

app.post("/messages/new", (req ,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err) { //internal server error
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
//listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));