// import { ArticlesRouter } from "./ArticlesRouter";
// import { ArticlesService } from "./ArticlesService";
const ArticlesService = require("./ArticlesService").ArticlesService;
const ArticlesRouter = require("./ArticlesRouter").ArticlesRouter;

const articlesService = new ArticlesService();

const articlesRouter = new ArticlesRouter({
    service: articlesService,
}).router;

module.exports = {
    articlesRouter: articlesRouter,
    articlesService: articlesService
};