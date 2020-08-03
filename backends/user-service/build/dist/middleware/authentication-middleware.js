"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
var loggers_1 = require("../utils/loggers");
function authenticationMiddleware(req, res, next) {
    if (!req.user) {
        res.status(401).send("Please Login");
    }
    else {
        loggers_1.logger.debug("user " + req.user.username + " has a role of " + req.user.role);
        next();
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map