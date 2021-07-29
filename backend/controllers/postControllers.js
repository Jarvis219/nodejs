import Post from '../model/postModel';
import _ from 'lodash';
export const addPort = (req, res) => {
    const post = new Post(req.body);
    // console.log(post);
    if (!post.title || !post.image || !post.author || !post.content || !post.introduce) {
        return res.status(400).json({
            error: "Enter enough information"
        })
    }
    post.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "add post failure"
            })
        }
        res.json({
            data
        })
    })
}
export const postID = (req, res, next, id) => {
    Post.findById(id).exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: "post does not exit"
            })
        }
        req.post = post;
        next()
    })
}

export const readPost = (req, res) => {
    return res.json(req.post);
}

export const removePost = (req, res) => {
    let post = req.post;
    // console.log(post);
    post.remove((err, deletePost) => {
        if (err || !post) {
            return res.status(400).json({
                error: "delete post failure"
            })
        }
        res.json({
            deletePost,
            message: "post delete successfully"
        })
    });
}


export const updatePost = (req, res) => {
    let post = req.post;
    // console.log(post);
    post = _.assignIn(post, req.body);
    // console.log(post);
    post.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "update post failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listPost = (req, res) => {
    Post.find((err, post) => {
        if (err) {
            return res.status(400).json({
                error: "post does not exit"
            })
        }
        res.json({
            post
        })
    })
}

// trả về bài post ngoài bài đang sử dụng

export const listPostRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 7;
    Post.find({
        _id: {
            $ne: req.post
        }
    }).limit(limit).exec((err, post) => {
        if (err) {
            res.status(400).json({
                error: "Post not found"
            })
        }
        res.json(post)
    })
}