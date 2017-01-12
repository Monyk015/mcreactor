"use strict";
const jwt = require('jsonwebtoken');
const secret = 'veryverysecret';
function generateToken(user) {
    return jwt.sign(user, secret);
}
exports.generateToken = generateToken;
function verifyToken(token) {
    if (token) {
        let user;
        try {
            user = jwt.verify(token, secret);
        }
        catch (err) {
            return false;
        }
        return user;
    }
    return false;
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map