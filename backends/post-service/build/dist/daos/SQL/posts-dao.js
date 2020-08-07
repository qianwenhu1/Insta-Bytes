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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.saveNewPost = exports.getPostById = exports.getPostsByUserId = exports.getAllPosts = exports.schema = void 0;
var _1 = require(".");
var NewPostInputError_1 = require("../../errors/NewPostInputError");
var postDTO_to_post_convertor_1 = require("../../utils/postDTO-to-post-convertor");
var PostNotFoundError_1 = require("../../errors/PostNotFoundError");
var loggers_1 = require("../../utils/loggers");
exports.schema = process.env['LB_SCHEMA'] || 'instabytes_post_service';
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select p.post_id, \n        p.user_id , \n        p.\"image\" , \n        p.\"caption\", \n        p.\"location\", \n        p.\"date\"  from " + exports.schema + ".posts p\n        order by p.\"date\" DESC")];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results.rows.map(postDTO_to_post_convertor_1.PostDTOtoPostConvertor)];
                case 3:
                    e_1 = _a.sent();
                    loggers_1.logger.error(e_1);
                    loggers_1.errorLogger.error(e_1);
                    throw new Error('Unhandeled Error Occured');
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllPosts = getAllPosts;
function getPostsByUserId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select p.post_id, \n        p.user_id , \n        p.\"image\" , \n        p.\"caption\", \n        p.\"location\", \n        p.\"date\"  from " + exports.schema + ".posts p\n        where p.user_id = $1\n        order by p.\"date\" DESC;", [id])
                        // if(results.rowCount === 0){
                        //     throw new Error('No posts')
                        // }
                    ];
                case 2:
                    results = _a.sent();
                    // if(results.rowCount === 0){
                    //     throw new Error('No posts')
                    // }
                    return [2 /*return*/, results.rows.map(postDTO_to_post_convertor_1.PostDTOtoPostConvertor)];
                case 3:
                    e_2 = _a.sent();
                    loggers_1.logger.error(e_2);
                    loggers_1.errorLogger.error(e_2);
                    throw new Error('Unhandeled Error Occured');
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPostsByUserId = getPostsByUserId;
function getPostById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select p.post_id, \n        p.user_id , \n        p.\"image\" , \n        p.\"caption\", \n        p.\"location\", \n        p.\"date\"  from " + exports.schema + ".posts p\n        where p.post_id = $1;", [id])];
                case 2:
                    results = _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error('post Not Found');
                    }
                    return [2 /*return*/, postDTO_to_post_convertor_1.PostDTOtoPostConvertor(results.rows[0])];
                case 3:
                    e_3 = _a.sent();
                    if (e_3.message === 'Post Not Found') {
                        throw new PostNotFoundError_1.PostNotFoundError();
                    }
                    loggers_1.logger.error(e_3);
                    loggers_1.errorLogger.error(e_3);
                    throw new Error('Unhandled Error Occured');
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPostById = getPostById;
function saveNewPost(newPost) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.query(" insert into " + exports.schema + ".posts\n        (\"user_id\", \"image\", \"caption\", \"location\", \"date\")\n        values($1,$2,$3,$4,$5) returning \"post_id\";", [newPost.userId, newPost.image, newPost.caption, newPost.location, newPost.date])];
                case 3:
                    results = _a.sent();
                    newPost.postId = results.rows[0].post_id;
                    return [4 /*yield*/, client.query('COMMIT;')];
                case 4:
                    _a.sent();
                    loggers_1.logger.debug("Save new post " + newPost);
                    return [2 /*return*/, newPost];
                case 5:
                    e_4 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (e_4.message === 'Role Not Found') {
                        throw new NewPostInputError_1.NewPostInputError();
                    }
                    loggers_1.logger.error(e_4);
                    loggers_1.errorLogger.error(e_4);
                    throw new Error('Unhandled Error Occured');
                case 6:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.saveNewPost = saveNewPost;
//Delete Post
function deletePost(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.query("delete from " + exports.schema + ".posts p\n        where p.\"post_id\" = $1", [id])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.query('COMMIT;')
                        //might keep just to verify post is now null
                        //console.log(post)
                        //returning this id might give an error, we shall see
                    ];
                case 4:
                    _a.sent();
                    //might keep just to verify post is now null
                    //console.log(post)
                    //returning this id might give an error, we shall see
                    return [2 /*return*/, id];
                case 5:
                    e_5 = _a.sent();
                    client && client.query('ROLLBACK;');
                    loggers_1.logger.error(e_5);
                    loggers_1.errorLogger.error(e_5);
                    throw new Error('Unhandled Error Occured');
                case 6:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deletePost = deletePost;
//export async function patchPost(post:Post):Promise<Post>{
//     console.log("in patch")
//     let client:PoolClient;
//     try{
//         client = await connectionPool.connect()
//         await client.query('BEGIN;')
//         //check if the post to update exists
//         let postId = await client.query(`select p.post_id from post p 
//         where p.post_id = $1`, [post.postId])
//         if(postId.rowCount === 0){
//             throw new Error('Post Not Found.')
//         }
//         postId = postId.rows[0].post_id
//         console.log(postId)
//         if(post.image){
//             console.log("in the image")
//             await client.query(`update posts 
//             set "image" = $1 where post_id = $2;`,[post.image, postId])
//             //console.log(updateResults.rows[0])
//         }
//         if(post.caption){
//             console.log("in the caption")
//             await client.query(`update post_reimbursement.posts 
//             set "caption" = $1 where post_id = $2;`,[post.caption, postId])
//             //console.log(updateResults.rows[0])
//         }
//         if(post.location){
//             console.log("in the location")
//             await client.query(`update posts 
//             set "location" = $1 where post_id = $2;`,[post.location, postId])
//             //console.log(updateResults.rows[0])
//         }
//         let results:QueryResult = await client.query(`select p.post_id, 
//         p.user_id , 
//         p."image" , 
//         p."caption", 
//         p."location", 
//         p."date"  from posts p
//         where p.post_id = $1;`,
//         [postId])
//         await client.query('COMMIT;')
//         console.log(results.rows[0])
//         return PostDTOtoPostConvertor(results.rows[0])
//     }
//     catch(e){
//         client && client.query('ROLLBACK;')
//         if(e.message === 'Post Not Found'){
//             throw new PostNotFoundError()
//         }
//         if(e.message === 'Role Not Found'){
//             throw new Error('Rollback Error')
//         }
//         console.log(e)
//         throw new Error('Unhandled Error Occured')
//     }
//     finally{
//         client && client.release()
//     }
// }
//# sourceMappingURL=posts-dao.js.map