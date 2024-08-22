const moment = require('moment-timezone');
const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
  //console.log(req);
  try {
     // console.log(req.body)
     const blog = new Blog({
        title : req.body.title,
        subheading: req.body.subheading,
        image:req.file.filename,
        content : req.body.content,
        blog_date: moment().tz('Asia/Karachi').toDate()
      });
      const BlogData = await blog.save();
      res.status(200).send({success:true,msg: 'Blog Data saved successfully',data:BlogData})
    } catch (error) {
      res.status(400).send({success:false,msg:error.message})
    }
}

const getBlogs = async (req,res) =>{

  try {
    const getData = await Blog.find({});
    res.status(200).send({success:true,msg: 'Post Data retrieved successfully',data:getData})
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }

}

const deleteBlog = async (req,res) =>{

  try {
    const id = req.params.id;
    await Blog.deleteOne({_id:id});
    res.status(200).send({success:true,msg: 'Post Data Deleted successfully'});
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }

}

const updateBlog = async (req,res) =>{

  try {
    if (req.file !== undefined) {
      
        var id = req.body.id;
        var title = req.body.title;
        var date = req.body.date;
        var filename = req.file.filename;
        await Blog.findByIdAndUpdate({_id:id},{$set:{ title:title,date:date,image:filename }});
        res.status(200).send({success:true,msg: 'Post Data Updated successfully'});
    } else {
        var id = req.body.id;
        var title = req.body.title;
        var date = req.body.date;
        await Blog.findByIdAndUpdate({_id:id},{$set:{ title:title,date:date}});
        res.status(200).send({success:true,msg: 'Post Data Updated successfully'});
    }
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }

}

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
}
