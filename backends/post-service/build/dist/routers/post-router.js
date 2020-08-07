"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
var express_1 = __importDefault(require("express"));
var PostIdInputError_1 = require("../errors/PostIdInputError");
var NewPostInputError_1 = require("../errors/NewPostInputError");
var post_service_1 = require("../services/post-service");
exports.postRouter = express_1.default.Router();
//Is this needed?
// postRouter.use(authenticationMiddleware);
exports.postRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_service_1.getAllPostsService()];
            case 1:
                allPosts = _a.sent();
                res.json(allPosts);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.postRouter.get('/users/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!isNaN(+id)) return [3 /*break*/, 1];
                next(new PostIdInputError_1.PostIdInputError);
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_service_1.getPostByUserIDService(+id)];
            case 2:
                post = _a.sent();
                res.json(post);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.postRouter.get('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!isNaN(+id)) return [3 /*break*/, 1];
                next(new PostIdInputError_1.PostIdInputError);
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_service_1.getPostByIDService(+id)];
            case 2:
                post = _a.sent();
                res.json(post);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.postRouter.get('/user/made/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!isNaN(+id)) return [3 /*break*/, 1];
                next(new PostIdInputError_1.PostIdInputError);
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_service_1.getUserByPostIDService(+id, req.headers.authorization)];
            case 2:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.postRouter.post('/create', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, image, caption, location, newPost, savedPost, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, image = _a.image, caption = _a.caption, location = _a.location;
                if (!(!userId || !image)) return [3 /*break*/, 1];
                next(new NewPostInputError_1.NewPostInputError);
                return [3 /*break*/, 5];
            case 1:
                newPost = {
                    postId: 0,
                    userId: userId,
                    image: image,
                    caption: caption,
                    location: location,
                    date: BigInt(Date.now())
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, post_service_1.saveNewPostService(newPost)];
            case 3:
                savedPost = _b.sent();
                res.status(201).send("Created");
                res.json(savedPost);
                return [3 /*break*/, 5];
            case 4:
                e_5 = _b.sent();
                next(e_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.postRouter.delete('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!isNaN(+id)) return [3 /*break*/, 1];
                next(new PostIdInputError_1.PostIdInputError);
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_service_1.deletePostService(+id)];
            case 2:
                _a.sent();
                res.json(req.postId);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                next(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//postRouter.patch('/', async (req:Request, res:Response, next:NextFunction) => {
//     let id = req.body.userId;
//     console.log(req.body);
//     console.log(id)
//     if(isNaN(+id)){
//         next(new PostIdInputError)
//     }
//     else{
//         let post: Post = {
//             postId: id,
//             userId: req.body.userId,
//             image: req.body.image,
//             caption: req.body.caption,
//             location: req.body.location,
//             date: req.body.date
//         }
//         console.log("in the router, just set the post")
//         console.log(post.postId)
//         console.log(post.userId)
//         try{
//             let updatedPost = await patchUserService(post)
//             res.json(updatedPost)
//         } catch (e){
//             next(e)
//         } 
//     }
// })
//# sourceMappingURL=post-router.js.map