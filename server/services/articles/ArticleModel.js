'use strict';
/*
 Manage the mongoose schema for the docker landscapes
 */

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelName = 'articles',
    articleSchema;

articleSchema = new Schema({
    title: {type: String, require: true},
    date: { type: Date, default: Date.now },
    type: {type: String},
    content: {type: String},
    paragraphs: [{ body: String, title: String, order: Number }],
    steps: [{ body: String, title: String, order: Number }]
});
// define virtuals

const ArticleModel = mongoose.model(modelName, articleSchema);
module.exports = ArticleModel;
