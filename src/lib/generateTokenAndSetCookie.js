import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("cinema", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
};
