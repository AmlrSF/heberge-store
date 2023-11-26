
require('dotenv').config()

const authenticate = (req, res, next) => {
    // Get the token from the cookie
    const token = req.cookies.token;

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload to the request for further use
        req.customerId = decoded.customerId;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};



module.exports = {
    authenticate   
};