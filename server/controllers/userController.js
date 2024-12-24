import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const registerUser = async(req, res)=> {
try {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
        name,
        email,
        password: hashedPassword,
    }

    const newUser = new User(userData);
    const user = await newUser.save();
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )

    res.json({
        success: true,
        token,
        user: {name: user.name}
    })
} catch (error) {
    console.log(error);
    res.json({
        success: false,
        messasge: error.message
    })
}
};


export const loginUser = async(req, res)=> {
try {
    
    const {email, password } = req.body;
    const user = await User.findOne({email: email});

    if(!user){
        return res.json({
            success: false,
            message: "User does not exist."
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )
        res.json({
            success: true,
            token,
            user: {name: user.name}
        })

    }else{
        return res.json({
            success: false,
            message: "Invlaid Credentials."
        })
    }
} catch (error) {
    console.log(error);
    res.json({
        success: false,
        messasge: error.message
    })
}
};

export const userCredits = async (req, res) => {
    try {
        
        const {userId} = req.body;

        const user = await User.findById(userId);

        res.json({
            success: true,
            credits: user.creditBalance,
            user: {name: user.name}
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            messasge: error.message
        })
    }
};

