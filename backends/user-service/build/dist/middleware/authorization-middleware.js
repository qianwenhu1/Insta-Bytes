"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
function authorizationMiddleware(roles) {
    return function (req, res, next) {
        var allowed = false;
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (req.user.role === role) {
                allowed = true;
                next();
            }
        }
        if (!allowed) {
            res.status(401).send('The incoming token has expired');
        }
    };
}
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization-middleware.js.map