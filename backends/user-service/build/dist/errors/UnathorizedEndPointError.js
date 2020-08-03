"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedEndPointError = void 0;
var HttpError_1 = require("./HttpError");
var UnauthorizedEndPointError = /** @class */ (function (_super) {
    __extends(UnauthorizedEndPointError, _super);
    function UnauthorizedEndPointError() {
        return _super.call(this, 401, 'The incoming token has expired') || this;
    }
    return UnauthorizedEndPointError;
}(HttpError_1.HttpError));
exports.UnauthorizedEndPointError = UnauthorizedEndPointError;
//# sourceMappingURL=UnathorizedEndPointError.js.map