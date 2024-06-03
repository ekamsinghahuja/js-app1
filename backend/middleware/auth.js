import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.headers['token']; // Corrected accessing request header
    
    // Logging the token for debugging
    console.log(token);

    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please log in again." });
    }

    try {
        const token_decode = jwt.verify(token, "secret");
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "Error in authentication." });
    }
};

export default authMiddleware;
