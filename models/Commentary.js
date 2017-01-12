"use strict";
/**
 * Created by Monyk on 06.11.2016.
 */
const db_1 = require("../config/db");
const Sequelize = require("sequelize");
const Commentary = db_1.default.define("Commentary", {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    timestamps: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Commentary;
//# sourceMappingURL=Commentary.js.map