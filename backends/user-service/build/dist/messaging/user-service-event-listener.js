"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
_1.userSubscription.on('message', function (message) {
    try {
        var parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString());
        console.log(parsedData);
        message.ack();
    }
    catch (e) {
        message.nack();
    }
});
//# sourceMappingURL=user-service-event-listener.js.map