const express = require('express');
const userRouter = require('./routes/usersRoute');
const app = express();
const mongoose = require('mongoose');
const bp = require('body-parser')

app.use('/users', userRouter);
app.use(express.json);
app.use(bp.json());
// app.use(bp.urlencoded({ extended: true }))
app.use((req,res,next)=>{
    console.log(`HTTP method ${req.method}, URl ${req.url}`)
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.vd3drj3.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(8080, () => {
    console.log('Server Started!');
});

