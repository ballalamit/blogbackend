const BlogModel = require('../models/Blogs.model');
const UserModel = require('../models/Users.model');
const BlogRouter = require('express').Router()



BlogRouter.get('/' , async (req, res) => {

    try {
        const { category , author } = req.query;
        let query = {};

        let user;
        if(author){
            let userid = req.user_id;
             user = await UserModel.findById(userid)
        }

        
        if (category && author) {
            query.category = category;
            query.author = user ? user.name : undefined;
            } else if (category) {
      
            query.category = category
            } else if (author) {
    
                query.author = user ? user.name : undefined;
            }
        console.log(query)
    
        const blogs = await BlogModel.find(query);
    
        res.send({ blogs });
      } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
      }
})



BlogRouter.post('/create' , async (req, res) => {
    let {title, description, category, image} = req.body;
    let userid= req.user_id
    try {
        let newBlog = await new BlogModel({
            title,
            description,
            category,
            image,
            author_id: userid
        });
        newBlog.save()
        res.send({message: "Blog created successfully"})
    } catch (error) {
        res.send({message: error})
    }
})

BlogRouter.put('/edit/:blogId' , async  (req, res) => {
    let {blogId} = req.params;
    let body = req.body;
    let userid= req.user_id
    try {
        let blog = await BlogModel.findById(blogId)
        if(userid == blog.author_id){
            await BlogModel.findByIdAndUpdate(blogId, body)
            res.send({message: "Blog edit successfully"})
        }
        else{
            res.send({message: "You dont have access to edit this page"})
        }
 
    } catch (error) {
        res.send({message: error})
    }

})

BlogRouter.delete('/delete/:blogId' , async (req, res) => {
    let {blogId} = req.params;
    let userid= req.user_id
    try {
        let blog = await BlogModel.findById(blogId)
        if(userid == blog.author_id){
            await BlogModel.findByIdAndDelete(blogId)
            res.send({message: "Blog deleted successfully"})
        }
        else{
            res.send({message: "You dont have access to delete this page"})
        }
 
    } catch (error) {
        res.send({message: error})
    }
})




module.exports = BlogRouter