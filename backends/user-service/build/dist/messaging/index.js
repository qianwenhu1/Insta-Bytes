"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTopic = void 0;
var pubsub_1 = require("@google-cloud/pubsub");
var pubSubClient = new pubsub_1.PubSub();
exports.userTopic = pubSubClient.topic('projects/pacific-destiny-281218/topics/user-service');
//# sourceMappingURL=index.js.map