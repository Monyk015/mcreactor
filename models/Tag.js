"use strict";
/**
 * Created by Monyk on 06.11.2016.
 */
const db_1 = require("../config/db");
const Sequelize = require("sequelize");
const Tag = db_1.default.define("Tag", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    indexes: [
        {
            fields: ['name'],
            unique: true
        }
    ],
    timestamps: true,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tag;
//# sourceMappingURL=Tag.js.map