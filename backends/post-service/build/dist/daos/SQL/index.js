"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.connectionPool = void 0;
//entry point for all of the db files
var pg_1 = require("pg");
exports.connectionPool = new pg_1.Pool({
    host: process.env['LB_HOST'],
    user: process.env['LB_USER'],
    password: process.env['LB_PASSWORD'],
    database: process.env['LB_DATABASE'],
    port: 5432,
    max: 5 // max number of connections
});
exports.schema = process.env['LB_SCHEMA'] || 'instabytes_post_service';
//# sourceMappingURL=index.js.map