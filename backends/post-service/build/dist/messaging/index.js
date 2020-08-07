"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTopic = void 0;
var pubsub_1 = require("@google-cloud/pubsub");
var pubSubClient = new pubsub_1.PubSub();
exports.postTopic = pubSubClient.topic('projects/pacific-destiny-281218/topics/post-service');
//# sourceMappingURL=index.js.map