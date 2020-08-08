"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var loggers_1 = require("../utils/loggers");
// import { Message } from "@google-cloud/pubsub";
function onMessage(message) {
    try {
        var parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString());
        loggers_1.logger.debug("Received New Post: " + parsedData);
        message.ack();
    }
    catch (e) {
        message.nack();
    }
}
_1.userSubscription.on('message', onMessage);
//# sourceMappingURL=user-service-event-listener.js.map