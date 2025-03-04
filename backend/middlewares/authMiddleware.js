const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Ambil token dari header
            token = req.headers.authorization.split(' ')[1];

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Cari user berdasarkan ID dari token
            req.user = await User.findById(decoded.id).select('-password');

            console.log("Decoded User:", decoded);
            console.log("User found:", req.user); // Tambahkan log ini buat debug

            next();
        } catch (error) {
            console.error("Error in authMiddleware:", error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
