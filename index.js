const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

var cors = require('cors')



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = require('./models/users')

async function run() {
    const app = express()
    const port = 3000

    app.use(cors())
    app.use(bodyParser())

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
    });

    app.post('/register', function (req, res) {
        console.log(req);
        const username = req.body.username;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // req.checkBody('name', 'Name is required').notEmpty();
        // req.checkBody('email', 'Email is required').notEmpty();
        // req.checkBody('email', 'Email is not valid').isEmail();
        // req.checkBody('username', 'Username is required').notEmpty();
        // req.checkBody('password', 'Password is required').notEmpty();
        // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        let errors = null;

        if (errors) {
            //
        } else {
            let newUser = new User({
                name: name,
                email: email,
                username: username,
                password: password
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            res.send(newUser);
                            //   res.redirect('/users/login');
                        }
                    });
                });
            });
        }
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))



}


run();

// insertMany

