const articles = require('./fakeArticles.json');

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articlesRouter = require("./services/articles").articlesRouter;

// import mongoose from "mongoose";
// import * as bodyParser from "body-parser";

// import { articlesRouter } from "./services/articles";

const runServer = async (port, mongoUri) => {
    if (!port) {
        process.exit(1);
    }

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true
    });

    const apiPath = "/api/v1";
    const app = express();

    const server = app.listen(port, () => {
        console.log(`Diary app listening on port ${port}!`);
    });

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

    app.use(apiPath, articlesRouter);

    app.use((error, req, res, next) => {
        res.status(error.status || 500);

        res.json({
            status: error.status,
            message: error.message,
            ...(process.env.NODE_ENV === "dev" && { stack: error.stack }),
        });
    });

    return server;
};

module.exports = runServer;