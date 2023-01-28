import Jwt from "jsonwebtoken";


// verification
export const verifyToken = async (req, res, next) => {
    try {
        // getting token from req.header
        let token = req.header("Authorization")

        if (!token) {
            return res.send(403).send("Access Denied")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        // verifying token
        const verified = Jwt.verify(token, process.env.JWT_SECRET)

        // setting attribute
        req.user = verified
        next()
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

}