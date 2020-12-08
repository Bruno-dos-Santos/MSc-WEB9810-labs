const mongoose = require('mongoose');

const ArticlesSchema = mongoose.Schema({
    title: String,
    narrative: String,
    author: String,
    url: String,
    numLikes: Number,
    date: {type: Date, default: Date.now },
    comments: [{
        commentersName: String,
        message: String,
        numLikes: Number,
        dateTime: {type: Date, default: Date.now }
    }],
    tags: [String]
},{
    timestamps: true
});

module.exports = mongoose.model('Posts', ArticlesSchema, 'Posts');
