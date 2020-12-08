const Article = require('../models/articles.model.js');

// Create a new one article
exports.create = (req, res) => {
    if ((!req.body.title) || (!req.body.narrative) || (!req.body.url)){
        return res.status(400).send({message: "Fields(Title, Narrative and URL) are required!" });
    }
    // class for the artice 
    const newArticle = new Article(
        {
            title: req.body.title,
            narrative: req.body.narrative,
            url: req.body.url,
            tags: req.body.tags || [],      //empty is not inputed. 
            author: req.body.author || "Unknown Author", // default value.
            numLikes: req.body.numLikes || 0,
            comments: req.body.comments || []
        }
    );
    newArticle.save()
    .then(data => { res.send(data); }).catch(err => {
        res.status(500).send({message: err.message || "ops something went wrong" });
    });
};
// following the lab7  let's get all article, get one by id, update one and also delete it.
// getting all articles from mongoDB.
exports.findAll = (req, res) => {
    Article.find()
    .then(articles => { res.send(articles); 
    }).catch(err => {
        res.status(500).send({message: err.message || "ops something went wrong"});
    });
};
// getting article by ID
exports.findOne = (req, res) => {
    Article.findById(req.params.id)
    .then(article => {
        if (!article){
            return res.status(404).send({
                message: "Article not found with id " + req.params.id
            });
        }
        res.send(article);
    }).catch(err => {
        if (err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Article not found with ObjectId " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving article with id " + req.params.id
        });
    });
}; 
// Update an article by its id
exports.update = (req, res) => {
    if ((!req.body.title) || (!req.body.narrative) || (!req.body.url)){
        return res.status(400).send({message: "Fields(Title, Narrative and URL) are required!"});
    }
    Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        narrative: req.body.narrative,
        url: req.body.url,
        tags: req.body.tags,        
        author: req.body.author,
        date: req.body.date,
        numLikes: req.body.numLikes,
        comments: req.body.comments
    }, {new: true})
    .then(article => {
        if (!article){
            return res.status(404).send({message: "Article not found (" + req.params.id + ")"});
        }
        res.send(article)
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: "Article not found (" + req.params.id + ")" });
        }
        return res.status(500).send({ message: "Error trying to update the article (" + req.params.id + ")"});
    });
};

// Delete an article by its id
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.id)
    .then(article => {
        if (!article){
            return res.status(404).send({message: "Article not found (" + req.params.id + ")"});
        }
        res.send({ message: "Article deleted!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: "Article not found (" + req.params.id + ")" });
        }
        return res.status(500).send({
            message: "Error trying to delete article with id(" + req.params.id+ ")"
        });
    });
};