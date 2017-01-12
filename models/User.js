"use strict";
/**
 * Created by Monyk on 06.11.2016.
 */
const db_1 = require("../config/db");
const Sequelize = require("sequelize");
const User = db_1.default.define("User", {
    nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER
    },
    isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
}, {
    timestamps: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=User.js.map