const bookModule = require('../Schemas/book')

exports.getAllbooks = async function(req,res){
    try{
        const books = await bookModule.find()

        return res.json({"status":200 , books: books})
    }catch(err){
        return res.status(404).send({message: err.stack})
    }
}

exports.getBook = async function(req,res){
    try{
        const book = await bookModule.find({_id: req.params.id})

        if(book.length === 0){
            return res.json({"status":200 , message: 'Book not found'})
        }else{
            return res.json({"status":200 , books: book})
        }

    }catch(err){
        return res.status(404).send({message: err.stack})
    }
}

exports.delete = async function(req,res){
    try{
        const Role = req.user.role

        if(Role === 'admin'){
            await bookModule.findByIdAndDelete(req.params.id)
    
            return res.json({"status":200 , message: 'Book Deleted'})
        }else{
            return res.status(403).send({message: 'Access Denied'})
        }
    }catch(err){
        return res.status(404).send({message: err.stack})
    }
}

exports.updete = async function(req,res){
    try{
        const Role = req.user.role

        if(Role === 'admin'){
        await bookModule.findByIdAndUpdate(req.params.id , req.body)

        return res.json({"status":200 , message: 'Book Updated'})
        }else{
            return res.status(403).send({message: 'Access Denied'})
        }
    }catch(err){
        return res.status(404).send({message: err.stack})
    }
}

exports.create = async function(req,res){
    try{
        const Role = req.user.role

        if(Role === 'admin'){
        const newBook = await bookModule.create(req.body)

        return res.json({"status":200 , message: 'Book Added'})
        }else{
            return res.status(403).send({message: 'Access Denied'})
        }
    }catch(err){
        return res.status(404).send({message: err.stack})
    }
}