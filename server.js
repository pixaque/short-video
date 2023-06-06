import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Videos from './dbModel.js'

//App Config
const app = express()
const port = process.env.PORT || 9000

const connection_url = 'mongodb+srv://sZ31fer0BeVOIGSx:t0o9pox48zI38VCz@cluster0.6dsvuo5.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
})

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body

    Videos.create(dbVideos)
    .then(() => {
        res.status(201).send(dbVideos)
    })
    .catch((err) => {
        res.status(500).send(err)
        res.send({dbVideos});
        //console.error(err);
    });


})

app.get('/v2/posts', async (req, res) => {

    try {
        const dbVideos = await Videos.find();
        
        res.status(200).json(dbVideos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))