"use strict";
/**
 * Created by Monyk on 06.11.2016.
 */
const db_1 = require("../config/db");
const Sequelize = require("sequelize");
const CommentaryRate = db_1.default.define("CommentaryRate", {
    rate: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    }
}, {
    timestamps: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentaryRate;
//# sourceMappingURL=CommentaryRate.js.map