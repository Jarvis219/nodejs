import Category from '../model/categoryModel';

export const addCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "add category failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listCategory = (req, res) => {
    
    Category.find((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "category does not exit"
            })
        }
        res.json({
            category
        })
    })
}

export const categoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "category does not exit"
            })
        }
        req.category = category;
        next()
    });
}
export const readCategory = (req, res) => {
    // console.log(2);
    return res.json(req.category)
}

export const removeCategory = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Delete category failure"
            })
        }
        res.json({
            deleteCategory,
            message: "Category deleted successfully"
        })
    });
}
export const updateCategory = (req, res) => {
    let category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "update category failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listRelatedCate = (req, res)=>{
    // console.log(1);
    // console.log(req.category);
    Category.find({
        _id:{$ne:req.category}
    })
    .populate('category', '_id name')
    .exec((err, cate)=>{
         if(err){
             res.status(400).json({
                error : "Category not found"
            })
         }res.json(cate)
    })
}