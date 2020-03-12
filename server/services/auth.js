const jwt = require("jsonwebtoken");

const createToken = (user = {}) => {
    return jwt.sign(
        {
            firstName: user.firstName
        },
        "demokeyzefjifbFDED3434ezhibhfzebhiezfcz",
        {
            algorithm: "HS256",
            expiresIn: 3600
        }
    );
};

const verifyToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token,  "demokeyzefjifbFDED3434ezhibhfzebhiezfcz", (err, decodedToken) => {
            if (err || !decodedToken) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
};

module.exports = {
    createToken,
    verifyToken
}
