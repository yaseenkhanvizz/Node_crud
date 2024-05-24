
const Post = require('../models/postModel');

const createPost = async (req, res) => {
  //console.log(req);
  try {
     // console.log(req.body)
     const post = new Post({
        title : req.body.title,
        date: req.body.date,
        image:req.file.filename
      });
      const PostData = await post.save();
      res.status(200).send({success:true,msg: 'Post Date',data:PostData})
    } catch (error) {
      res.status(400).send({success:false,msg:error.message})
    }
}

const getPosts = async (req,res) =>{

  try {
    const getData = await Post.find({});
    res.status(200).send({success:true,msg: 'Post Data retrieved successfully',data:getData})
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }

}

const deletePost = async (req,res) =>{

  try {
    const id = req.params.id;
    await Post.deleteOne({_id:id});
    res.status(200).send({success:true,msg: 'Post Data Deleted successfully'});
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }

}

module.exports = {
  createPost,
  getPosts,
  deletePost
}
