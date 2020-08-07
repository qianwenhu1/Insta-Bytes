"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBucket = exports.bucketBaseUrl = exports.bucketName = void 0;
var storage_1 = require("@google-cloud/storage");
exports.bucketName = 'insta-bytes-bucket';
exports.bucketBaseUrl = "https://storage.googleapis.com/" + exports.bucketName;
exports.imageBucket = new storage_1.Storage().bucket(exports.bucketName);
//# sourceMappingURL=index.js.map