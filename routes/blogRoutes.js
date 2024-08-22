const express = require('express');
const blog_route = express();
const bodyParser = require('body-parser');

blog_route.use(bodyParser.json());
blog_route.use(bodyParser.urlencoded({extended:true}));

const multer = require('multer');
const path = require('path');

blog_route.use(express.static('public'));
const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../public/postImages'),(err,succ)=>{
            if (err) {
                console.log(err);
            }
        }); 
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name,(err,succ)=>{
            if (err) {
                console.log(err);
            }
        }); // Use the current timestamp and original file name
    }
});

const upload = multer({ storage: storage });

const blogController = require('../controllers/blogController');

blog_route.post('/create-blog',upload.single('featuredImage'),blogController.createBlog);
blog_route.get('/get-blog',blogController.getBlogs);
blog_route.get('/delete-blog/:id',blogController.deleteBlog);
blog_route.post('/update-blog',upload.single('featuredImage'),blogController.updateBlog);
module.exports = blog_route;