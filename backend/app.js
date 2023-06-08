const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const path = require('path');
const fs = require('fs');
const { fileURLToPath } = require('url');

const authRoutes=require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts');

// data
const {users} = require('./data/index.js');
const {posts} = require('./data/index.js');
// console.log(users,posts)

// models
const User = require('./models/User');
const Post = require('./models/Post');

// middleware configurations
dotenv.config()
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



// file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null,'public/assets')
     },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      ||  file.mimetype === 'image/jpeg'
    ) {
      cb(null,true)
    } else {
      cb(null,false)
    }
}
  


const upload = multer({ storage,fileFilter});

app.use(upload.single('image'))
app.use('/auth',authRoutes)
app.use('users', userRoutes);
app.use('posts', postRoutes);


// MONGOOSE SETUP 

const port = process.env.PORT || 6000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    app.listen(port, () => {
      console.log(`server is running on ${port}`)
      // User.insertMany(users);
      // Post.insertMany(posts)
    })
}).catch((err) => {
    console.log('Error ',err)
})