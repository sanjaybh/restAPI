const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParcer = require("body-parser")
mongoose.connect("mongodb://localhost/test", () => {
    useNewUrlParser: true
})

//const routes = require('./src/routes/crmRoutes')

// const Cat = mongoose.model('Cat', { name: String })
// const kitty = new Cat({name:'Mimi'})

// kitty.save().then((res) => {
//     console.log(res)
//     console.log("Meow")
// })


// app.get('/', (req, res, next) => {
//     console.log('Message from server - ', req.method)
//     next()
// }, (req, res, next)=>{
//     console.log("Request Original URL - ", req.originalUrl)
//     next()
// }, (req, res, next)=>{
//     res.send(" -> Requst was successfull")
// })

app.use(bodyParcer.json())
app.use(bodyParcer.urlencoded({
    extended: true
}))

const BlogSchema = require('./src/models/crmModel')
const blogModel = mongoose.model('blog', BlogSchema)

//creating new blogs
app.post('/newBlog', (req, res) =>{
    let blog = new blogModel(req.body)
    blog.save((err, blogModel) =>{
        if(err){
            res.send(err)
        }
        res.json(blog)
    })
})

//fetching all blogs
const getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if(err){
            res.send(err)
        } else {
            res.json(blogs)
        }
    })
}
app.get('/getBlogs', getAllBlogs)

//fetching blogs by id
let getBlogById = (req, res) =>{
    blogModel.findById((req.params.blogId), (err, blog) => {
        if(err){
            res.send(err)
        } else {
            res.json(blog)
        }
    })
}
app.get('/blog/:blogId', getBlogById)


//Updating blog
const updateBlog = (req, res) => {
    blogModel.findOneAndUpdate({ _id: req.params.blogId}, req.body, { new: true}, (err, updatedBlog) => {
        if(err){
            res.send(err)
        } else {
            res.json(updateBlog)
        }
    })
}
app.put('/blog/:blogId', updateBlog)


//deleting blogs
const deleteBlog = (req, res) => {
    blogModel.findOneAndDelete({ _id: req.params.blogId}, (err, updatedBlog) => {
        if(err){
            res.send(err)
        } else {
            res.json({message: "Blog deleted successfully"})
        }
    })
}
app.delete('/blog/:blogId', deleteBlog)


//Static files
app.use(express.static('public'))

//Listening to a port
app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`)
})