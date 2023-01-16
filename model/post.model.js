const { Schema, model } = require('mongoose');

const postSchema = Schema({
    title: String,
    body: String,
    device: String,
    authorId:String
})

let post={"title":"phone","body":"this is first post","device":"mobile"}

const PostModel = model('post', postSchema);

module.exports = { PostModel };