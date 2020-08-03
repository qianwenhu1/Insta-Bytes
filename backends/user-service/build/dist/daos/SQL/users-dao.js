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
exports.saveNewUser = exports.getUsernameAndPassword = exports.patchUser = exports.getUserById = exports.getAllUsers = void 0;
var _1 = require(".");
var userDTO_to_user_convertor_1 = require("../../utils/userDTO-to-user-convertor");
var UserNotFoundError_1 = require("../../errors/UserNotFoundError");
var BadCredentialsError_1 = require("../../errors/BadCredentialsError");
var NewUserInputError_1 = require("../../errors/NewUserInputError");
var loggers_1 = require("../../utils/loggers");
var schema = process.env['LB_SCHEMA'] || 'instabytes_user_service';
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id, \n        u.username , \n        u.\"password\" , \n        u.first_name, \n        u.last_name, \n        u.email , \n        r.role_id, \n        r.\"role\",\n        u.\"image\",\n        u.\"favorite_food\",\n        u.\"city\" from " + schema + ".users u left join " + schema + ".roles r on u.\"role\" = r.role_id;")];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results.rows.map(userDTO_to_user_convertor_1.UserDTOtoUserConvertor)];
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
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id, \n        u.username , \n        u.\"password\",\n        u.first_name,\n        u.last_name, \n        u.email ,\n        r.role_id , \n        r.\"role\",\n        u.\"image\",\n        u.\"favorite_food\",\n        u.\"city\" \n        from " + schema + ".users u left join " + schema + ".roles r on u.\"role\" = r.role_id \n        where u.user_id = $1;", [id])];
                case 2:
                    results = _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error('User Not Found');
                    }
                    return [2 /*return*/, userDTO_to_user_convertor_1.UserDTOtoUserConvertor(results.rows[0])];
                case 3:
                    e_2 = _a.sent();
                    if (e_2.message === 'User Not Found') {
                        throw new UserNotFoundError_1.UserNotFoundError();
                    }
                    loggers_1.logger.error(e_2);
                    loggers_1.errorLogger.error(e_2);
                    throw new Error('Unhandled Error Occured');
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
function patchUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var client, userId, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 22, 23, 24]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')
                        //check if the user to update exists
                    ];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id from " + schema + ".users u \n        where u.user_id = $1", [user.userId])];
                case 3:
                    userId = _a.sent();
                    if (userId.rowCount === 0) {
                        throw new Error('User Not Found.');
                    }
                    userId = userId.rows[0].user_id;
                    if (!user.username) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"username\" = $1 where user_id = $2;", [user.username, userId])];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!user.password) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"password\" = $1 where user_id = $2;", [user.password, userId])];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (!user.firstName) return [3 /*break*/, 9];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"first_name\" = $1 where user_id = $2;", [user.firstName, userId])];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    if (!user.lastName) return [3 /*break*/, 11];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"last_name\" = $1 where user_id = $2;", [user.lastName, userId])];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    if (!user.email) return [3 /*break*/, 13];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"email\" = $1 where user_id = $2;", [user.email, userId])];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    if (!user.image) return [3 /*break*/, 15];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"image\" = $1 where user_id = $2;", [user.image, userId])];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    if (!user.favoriteFood) return [3 /*break*/, 17];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"favorite_food\" = $1 where user_id = $2;", [user.favoriteFood, userId])];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17:
                    if (!user.city) return [3 /*break*/, 19];
                    return [4 /*yield*/, client.query("update " + schema + ".users \n            set \"city\" = $1 where user_id = $2;", [user.city, userId])];
                case 18:
                    _a.sent();
                    _a.label = 19;
                case 19: return [4 /*yield*/, client.query("select u.user_id, \n        u.username , \n        u.\"password\",\n        u.first_name,\n        u.last_name, \n        u.email ,\n        r.role_id , \n        r.\"role\",\n        u.\"image\",\n        u.\"favorite_food\",\n        u.\"city\" \n        from " + schema + ".users u left join " + schema + ".roles r on u.\"role\" = r.role_id \n        where u.user_id = $1;", [userId])];
                case 20:
                    result = _a.sent();
                    return [4 /*yield*/, client.query('COMMIT;')];
                case 21:
                    _a.sent();
                    loggers_1.logger.debug("Here is the modifed user " + result.rows[0]);
                    return [2 /*return*/, userDTO_to_user_convertor_1.UserDTOtoUserConvertor(result.rows[0])];
                case 22:
                    e_3 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (e_3.message === 'User Not Found') {
                        throw new UserNotFoundError_1.UserNotFoundError();
                    }
                    if (e_3.message === 'Role Not Found') {
                        throw new Error('Rollback Error');
                    }
                    loggers_1.logger.error(e_3);
                    loggers_1.errorLogger.error(e_3);
                    throw new Error('Unhandled Error Occured');
                case 23:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 24: return [2 /*return*/];
            }
        });
    });
}
exports.patchUser = patchUser;
function getUsernameAndPassword(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id, \n        u.username, \n        u.\"password\", \n        u.first_name, \n        u.last_name, \n        u.email , \n        r.role_id , \n        r.\"role\",\n        u.\"image\",\n        u.\"favorite_food\",\n        u.\"city\"\n        from " + schema + ".users u left join " + schema + ".roles r on u.\"role\" = r.role_id\n        where u.username = $1 and u.password = $2;", [username, password])];
                case 2:
                    results = _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error('User Not Found');
                    }
                    return [2 /*return*/, userDTO_to_user_convertor_1.UserDTOtoUserConvertor(results.rows[0])];
                case 3:
                    e_4 = _a.sent();
                    if (e_4.message === 'User Not Found') {
                        throw new BadCredentialsError_1.BadCredentialsError();
                    }
                    loggers_1.logger.error(e_4);
                    loggers_1.errorLogger.error(e_4);
                    throw new Error('Unhandled Error Occured');
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getUsernameAndPassword = getUsernameAndPassword;
function saveNewUser(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var client, roleId, results, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')
                        // let usernameCheck = await client.query('select count(*) from user_reimbursement.users u where u.username = $1', [newUser.username])
                        // // if(usernameCheck !== 0){
                        // //     throw new Error('Username Already Exists')
                        // // }
                        // console.log(usernameCheck)
                        // let roleId = await client.query('select r.role_id from user_reimbursement.roles r where r.role = $1', [newUser.role])
                        // if(roleId.rowCount === 0){
                        //     throw new Error('Role Not Found.')
                        // }
                        // roleId = roleId.rows[0].role_id
                    ];
                case 2:
                    _a.sent();
                    roleId = 3;
                    return [4 /*yield*/, client.query(" insert into " + schema + ".users\n        (\"username\", \"password\", \"first_name\", \"last_name\", \"email\", \"role\", \"image\", \"favorite_food\", \"city\")\n        values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning \"user_id\";", [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, roleId, newUser.image, newUser.favoriteFood, newUser.city])];
                case 3:
                    results = _a.sent();
                    newUser.userId = results.rows[0].user_id;
                    return [4 /*yield*/, client.query('COMMIT;')];
                case 4:
                    _a.sent();
                    loggers_1.logger.debug("Save new user " + newUser);
                    return [2 /*return*/, newUser];
                case 5:
                    e_5 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (e_5.message === 'Role Not Found') {
                        throw new NewUserInputError_1.NewUserInputError();
                    }
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
exports.saveNewUser = saveNewUser;
//# sourceMappingURL=users-dao.js.map