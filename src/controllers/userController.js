const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'UserKey';



const signup = async (req, res) => {

    // console.log('User Sign Up!')
    const { userName, password, email } = req.body;
    console.log(req.body);
    try {
        // const userName = req.body.userName;
        // const password = req.body.password;
        // const email = req.body.email;

        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(404).json({ message: 'User Already Exists!' })
        }

        const hashedPassword = await bcrypt.hash(password, 4);

        const result = await userModel.create({
            userName: userName,
            email: email,
            password: hashedPassword
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY,)
        res.status(200).json({ user: result, token: token })


    } catch (error) {
        res.status(500).json({ message: 'Oops! Something Went Wrong!' })
    }
}

const signin = async (req, res) => {

    // console.log('User Sign In!');
    try{
        const {email, password} = req.body;
        const existingUser = await userModel.findOne({ email: email });
            if (!existingUser) {
                return res.status(404).json({ message: 'User Doesnot Exist!' })
            }
            
            const matchPassword = await bcrypt.compare(password, existingUser.password)
            
            if(!matchPassword){
                return res.status(404).json({ message: 'Incorrect Password!' })
            }
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY,{
                expiresIn: '5m'
            })
            res.status(200).json({ user: existingUser, token: token })

            // cookie mai valid token jb tk hai session expire na ho 
            // res.status(200).cookie('token',token)//.redirect('Jis page pe send krna hai uska path ayga')

    }catch(error) {
        res.status(500).json({ message: 'Oops! Something Went Wrong!' })
    }
}

module.exports = { signup, signin };