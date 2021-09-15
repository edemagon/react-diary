'use strict';
const ArticleModel = require('./ArticleModel');

class ArticlesService {
    constructor() {
        this.started = 'yes';
    }
    validateArticle(article) {
        if (!article) {
            return ["Article is required"];
        }

        const errors = [];

        if (!article.title) {
            errors.push("title is required");
        }

        return errors;
    };

    async createArticle(article) {
        const errors = this.validateArticle(article);
        if (errors && errors.length) {
            throw new Error(errors);
        }
        // const new = JSON.parse(JSON.stringify(article));
        const newArticle = new ArticleModel(JSON.parse(JSON.stringify(article)));
        await newArticle.save();
        return newArticle.toJSON();
    }

    async getArticles() {
        return ArticleModel.find();
    }
}

module.exports = {
    ArticlesService : ArticlesService
};