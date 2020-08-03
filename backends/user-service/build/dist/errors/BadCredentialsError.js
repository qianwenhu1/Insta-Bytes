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
exports.BadCredentialsError = void 0;
var HttpError_1 = require("./HttpError");
var BadCredentialsError = /** @class */ (function (_super) {
    __extends(BadCredentialsError, _super);
    function BadCredentialsError() {
        return _super.call(this, 400, "Invalid Credentials") || this;
    }
    return BadCredentialsError;
}(HttpError_1.HttpError));
exports.BadCredentialsError = BadCredentialsError;
//# sourceMappingURL=BadCredentialsError.js.map