const express = require('express');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cors = require('cors')


const connection = require('./config/db')
const UserModel = require('./models/Users.model')
const BlogRouter = require('./Routes/blogRoutes');
const authorisation = require('./Middleware/authorisation');


const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: "Base route" })
})

app.post('/signup', async (req, res) => {
    let { email, password, name, phone_Number } = req.body;
    

    let user = await UserModel.findOne({ email: email })
    if (!user) {
        
        bcrypt.hash(password, 5, function (err, hashedPassword) {
            // Store hash in your password DB.
            if (err) {
                res.status(500).json({ message: "Something went wrong" });
            }
            else {
                const newUser = new UserModel({
                    email,
                    password: hashedPassword,
                    name,
                    phone_Number
                });
                newUser.save()
            }

        });

        res.send({ message: "User registered Successfully" })
    }
    else {
        res.send({ message: "this user already exists" })
    }

})



app.post('/login',async (req, res) => {
    let { email, password } = req.body;
    

    let user = await UserModel.findOne({ email: email })
    if(user){
        let hashedpassword = user.password;

        bcrypt.compare(password, hashedpassword, function(err, response) {
            if(response){
                let token = jwt.sign({ user_id: user.id }, 'amit');
                res.send({ message: "Login Successfull" , token });
            }
            else{
                res.send({ message: "Please check your password" });
            }
        });
    }
    else{
        res.send({ message: "Please check your username and password" })
    }
})

app.use('/blogs', authorisation,  BlogRouter)


let PORT = process.env.PORT || 8090
app.listen(PORT, async () => {
    try {
        await connection
        console.log('db is working')
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${PORT}`);
})