const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var cors = require('cors')



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

async function run() {
    const app = express()
    const port = 3000

    app.use(cors())

    await mongoose.connect('mongodb://localhost:27017/mel', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const CardsSchema = new Schema({
        title: String,
        text: String,
        img: String,
        viewCount: Number,
        commentCount: Number,
        newDate: Number,
    });

    const MyModel = mongoose.model('card', CardsSchema);





    // REST
    app.get('/', (req, res) => res.send('Hello World!'))

    app.get('/cards', async (req, res) => {
        // sort- req.query.sort

        const cards = await MyModel.find();
        console.log(cards);
        res.send(cards)
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))


}

run();

// insertMany

