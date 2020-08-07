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
exports.PostInputError = void 0;
var HttpError_1 = require("./HttpError");
//We may not need this error
var PostInputError = /** @class */ (function (_super) {
    __extends(PostInputError, _super);
    function PostInputError() {
        return _super.call(this, 400, 'Please Fill out all Post Fields') || this;
    }
    return PostInputError;
}(HttpError_1.HttpError));
exports.PostInputError = PostInputError;
//# sourceMappingURL=PostInputError.js.map