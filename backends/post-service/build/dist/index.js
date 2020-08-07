"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jwt_verify_middleware_1 = require("./middleware/jwt-verify-middleware");
var logging_middleware_1 = require("./middleware/logging-middleware");
var cors_filter_1 = require("./middleware/cors-filter");
var post_router_1 = require("./routers/post-router");
var loggers_1 = require("./utils/loggers");
require("./event-listeners/new-post");
var basePath = process.env['LB_BASE_PATH'] || '';
var app = express_1.default();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(logging_middleware_1.loggingMiddleware);
app.use(cors_filter_1.corsFilter);
app.use(jwt_verify_middleware_1.JWTVerifyMiddleware);
var basePathRouter = express_1.default.Router();
app.use(basePath, basePathRouter);
basePathRouter.use('/posts', post_router_1.postRouter);
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
// app.post('/create', async (req:Request, res:Response, next:NextFunction) => {
//     let {
//         userId,
//         image,
//         caption,
//         location,
//         date} = req.body;
//         if(!userId|| !image || !date){
//             next(new NewPostInputError)
//         }
//         else{
//             console.log("in the else")
//             let newPost: Post = {
//                 postId: 0,
//                 userId,
//                 image,
//                 caption,
//                 location,
//                 date}
//             try{
//                 let savedPost = await saveNewPost(newPost)
//                 res.status(201).send("Created")
//                 res.json(savedPost)
//             } catch (e){
//                 next(e)
//             }   
//         }
// })
app.use(function (err, req, res, next) {
    if (err.statusCode) {
        loggers_1.logger.debug(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        loggers_1.logger.error(err);
        loggers_1.errorLogger.error(err); //print out to both location
        res.status(500).send("something went wrong");
    }
});
app.listen(2007, function () {
    //app.listen(2006, ()=>{
    loggers_1.logger.info('Server has started');
});
//# sourceMappingURL=index.js.map