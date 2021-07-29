import Information from '../model/informationModel';
import _ from 'lodash';
export const addInfor = (req, res) => {
    const infor = new Information(req.body);
    infor.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "add information failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listInfor = (req, res) => {
    Information.find((err, infor) => {
        if (err) {
            return res.status(400).json({
                error: "information does not exit"
            })
        }
        res.json({
            infor
        })
    })
}

export const inforByID = (req, res, next, id) => {
    Information.findById(id).exec((err, infor) => {
        if (err || !infor) {
            return res.status(400).json({
                error: "information does not exit"
            })
        }
        req.infor = infor;
        next();
    })
}
export const readInfor = (req, res) => {
    return res.json(req.infor)
}

export const removeInfor = (req, res) => {
    let infor = req.infor;
    infor.remove((err, deleteInfor) => {
        if (err || !infor) {
            return res.status(400).json({
                error: "Delete infor failure"
            })
        }
        res.json({
            deleteInfor,
            message: "infor deleted successfully"
        })
    });
}
export const updateInfor = (req, res) => {
    let infor = req.infor;
    infor = _.assignIn(infor, req.body);
    infor.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "update infor failure"
            })
        }
        res.json({
            data
        })
    })
}

