"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || 'default-secret');
};
const router = express_1.default.Router();
router.post('/login', async (req, res) => {
    const user = await User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const userId = user._id.toString();
    return res.json({ token: generateToken(userId) });
});
exports.default = router;
//# sourceMappingURL=auth.js.map