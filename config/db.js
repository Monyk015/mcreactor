"use strict";
/**
 * Created by Monyk on 05.11.2016.
 */
const Sequelize = require("sequelize");
const db = new Sequelize('mysql://root:root@db/mcreactor', {
    dialectOptions: {
        multipleStatements: true
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = db;
//# sourceMappingURL=db.js.map