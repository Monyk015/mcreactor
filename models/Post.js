"use strict";
/**
 * Created by Monyk on 06.11.2016.
 */
const db_1 = require("../config/db");
const Sequelize = require("sequelize");
const Post = db_1.default.define("Post", {
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Post;
//# sourceMappingURL=Post.js.map