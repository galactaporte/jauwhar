const express = require ('express')
const Author = require('../models/author')
const router = express.Router()

//All authors route
router.get('/', async (req, res) =>{
    //storing search options...
    let searchOptions = {}
    if (req.query. name != null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name, 'i') 
        //make search 'non-case sensitive' and partial string accepted as search wildcard
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render ('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//new author route
router.get('/new',(req, res) => {
    res.render('authors/new', { author: new Author() })
})

//create author route
router.post('/', async (req, res) =>{
    const author = new Author({
        name:req.body.name
    })

    try{
        const newAuthor = await author.save()
        //res.redirect (`authors/${newAuthor.id}`)
        res.redirect ('authors')            
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Erorr creating author'
        })
    }
})


// callback demo (non-async-await)
//     author.save((err, newAuthor) =>{
//         if(err) {
//             res.render('authors/new', {
//             author: author,
//             errorMessage: 'Erorr creating author'
//         })
//         } else {
//             //res.redirect (`authors/${newAuthor.id}`)
//             res.redirect ('authors')            
//         }
//     })

module.exports = router