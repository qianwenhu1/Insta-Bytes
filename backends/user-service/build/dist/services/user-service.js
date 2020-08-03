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
exports.patchUserService = exports.saveNewUserService = exports.getUserByIDService = exports.getAllUsersService = void 0;
var users_dao_1 = require("../daos/SQL/users-dao");
var user_images_1 = require("../daos/Cloud-Storage/user-images");
var Cloud_Storage_1 = require("../daos/Cloud-Storage");
var event_listeners_1 = require("../event-listeners");
var loggers_1 = require("../utils/loggers");
//calls the dao, easier to expand a function that already exists instead of inserting a new function
function getAllUsersService() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_dao_1.getAllUsers()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAllUsersService = getAllUsersService;
function getUserByIDService(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_dao_1.getUserById(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUserByIDService = getUserByIDService;
function saveNewUserService(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var base64Image, _a, dataType, imageBase64Data, contentType, date, savedUser, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    base64Image = newUser.image;
                    _a = base64Image.split(';base64,'), dataType = _a[0], imageBase64Data = _a[1];
                    contentType = dataType.split('/').pop();
                    date = Date.now();
                    if (newUser.image) {
                        newUser.image = Cloud_Storage_1.bucketBaseUrl + "/users/" + newUser.username + "/" + date + "/profile." + contentType;
                    }
                    return [4 /*yield*/, users_dao_1.saveNewUser(newUser)];
                case 1:
                    savedUser = _b.sent();
                    return [4 /*yield*/, user_images_1.saveProfilePicture(contentType, imageBase64Data, "users/" + newUser.username + "/" + date + "/profile." + contentType)];
                case 2:
                    _b.sent();
                    event_listeners_1.expressEventEmitter.emit(event_listeners_1.customExpressEvents.NEW_USER, newUser);
                    return [2 /*return*/, savedUser];
                case 3:
                    e_1 = _b.sent();
                    loggers_1.logger.error(e_1);
                    loggers_1.errorLogger.error(e_1);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.saveNewUserService = saveNewUserService;
function patchUserService(updateUser) {
    return __awaiter(this, void 0, void 0, function () {
        var date, savedUser, base64Image, _a, dataType, imageBase64Data, contentType, userInfo, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    date = Date.now();
                    savedUser = undefined;
                    if (!updateUser.image) return [3 /*break*/, 4];
                    base64Image = updateUser.image;
                    _a = base64Image.split(';base64,'), dataType = _a[0], imageBase64Data = _a[1];
                    contentType = dataType.split('/').pop();
                    return [4 /*yield*/, users_dao_1.getUserById(updateUser.userId)];
                case 1:
                    userInfo = _b.sent();
                    loggers_1.logger.info("Start Changing " + userInfo.username + " profile information");
                    updateUser.image = Cloud_Storage_1.bucketBaseUrl + "/users/" + userInfo.username + "/" + date + "/profile." + contentType;
                    return [4 /*yield*/, users_dao_1.patchUser(updateUser)];
                case 2:
                    savedUser = _b.sent();
                    return [4 /*yield*/, user_images_1.saveProfilePicture(contentType, imageBase64Data, "users/" + userInfo.username + "/" + date + "/profile." + contentType)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, users_dao_1.patchUser(updateUser)];
                case 5:
                    savedUser = _b.sent();
                    _b.label = 6;
                case 6: 
                //await saveProfilePicture(contentType, imageBase64Data, `users/${updateUser.userId}/profile.${contentType}`)
                //expressEventEmitter.emit(customExpressEvents.NEW_USER, updateUser)
                return [2 /*return*/, savedUser];
                case 7:
                    e_2 = _b.sent();
                    loggers_1.logger.error(e_2);
                    loggers_1.errorLogger.error(e_2);
                    throw e_2;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.patchUserService = patchUserService;
//# sourceMappingURL=user-service.js.map