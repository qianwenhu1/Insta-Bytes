"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
var loggers_1 = require("../utils/loggers");
function loggingMiddleware(req, res, next) {
    loggers_1.logger.debug(" " + req.method + " Request from " + req.ip + " to " + req.path + " ");
    next();
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging-middleware.js.map