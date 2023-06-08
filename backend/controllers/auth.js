const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const User=require('../models/User.js')


// user registration
exports.register = async(req, res, next) => {
   try {
       const {
           firstName,
           lastName,
           email,
           password,
           imagePath,
           friends,
           location,
           occupation } = req.body;
       
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = new User({
           firstName,
           lastName,
           email,
           password: hashedPassword,
           imagePath,
           friends,
           location,
           occupation,
           viewedProfile: Math.floor(Math.random() * 1000),
           likes: Math.floor(Math.random() * 1000)
       });
        await newUser.save();
       return res.status(201).json({message:`User ${firstName} ${lastName} is saved`})
   } catch (error) {
       console.log(error)
   return res.status(500).json({message:`${error.message}`})
   }
}

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
           return res.status(400).json({message:'User does not exist.'})
        }
        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) {
          return  res.status(400).json({message:'Invalid user credentials'})
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({message:`Login successful ${user.firstName} ${user.lastName}`,token})
    } catch (error) {
     
        return res.status(500).json({message:`${error.message}`})
    }
}