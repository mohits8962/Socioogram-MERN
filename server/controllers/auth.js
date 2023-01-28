import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
// the way this register function works, is we encrypt the password and save it. After saving it.
// When the user tries to log in we are gonna provide the password or like they are goona provide the password and we are salt that password again and we make sure that the correct password and we are gonna give the json web tokes as res

export const register = async (req, res) => {
    try {
        // destucturing values from req.body
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body

        // using bcrypt to encrypt the password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// login user
export const login = async (req, res) => {
    try {
        // destucturing the values of req.body
        const { email, password } = req.body

        // making a db call to find email
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        // comparing password 
        const isMatch = await bcrypt.compare( password , user.password );
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // if credentials match then it will create token
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // after that we delete the password so it doesn't get sent back to frontend
        delete user.password
        res.status(200).json({ token, user })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}