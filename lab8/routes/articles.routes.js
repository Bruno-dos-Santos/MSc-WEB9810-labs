module.exports = (app) => {
    const articles = require('../controllers/articles.controller.js');
    // Create a new article
    app.post('/articles', articles.create);
    // Get all Article
    app.get('/articles', articles.findAll);
    // geting article by ID
    app.get('/article/:id', articles.findOne);
    // Delete by id ID
    app.delete('/article/:id', articles.delete);
    // Update article by ID
    app.put('/article/:id', articles.update);
}
