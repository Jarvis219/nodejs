import User from '../model/userModel';


export const listUser = (req, res) => {
    User.find((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User does not exit"
            })
        }
        res.json({
            user
        })
    })
}
export const userID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.profile);
}

export const removeUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "delete user failure"
            })
        }
        res.json({
            user,
            message: "User deleted successfully"
        })
    })
}

export const updateUser = (req, res) => {
    // console.log(req.profile);
    User.findOneAndUpdate({
        _id: req.profile._id
    }, {
        $set: req.body
    }, {
        new: true
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform in action'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    })
}