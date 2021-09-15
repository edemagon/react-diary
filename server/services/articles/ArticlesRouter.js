
// import { Router } from "express";
const { Router } = require("express");
const asyncHandler = require("express-async-handler");

class ArticlesRouter {
    constructor({ service }) {
        this.router = Router();
        this.service = service;

        this.router.get("/articles/", asyncHandler(this.getArticles.bind(this)));
        this.router.post("/articles/", asyncHandler(this.createArticle.bind(this)));
    }

    async getArticles(req, res) {
        const articles = await this.service.getArticles();
        return res.status(200).json({ articles });
        // return res.status(200).json('coucou');
    }

    async createArticle(req, res) {
        const article = req.body;
        const newArticle = await this.service.createArticle(article);
        return res.status(200).json({ article: newArticle });
    }
}

module.exports = {
    ArticlesRouter: ArticlesRouter
};