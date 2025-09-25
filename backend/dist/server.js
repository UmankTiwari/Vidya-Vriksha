"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const subject_1 = __importDefault(require("./routes/subject"));
const progress_1 = __importDefault(require("./routes/progress"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const ai_1 = __importDefault(require("./routes/ai"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.connectDB)();
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/subjects', subject_1.default);
app.use('/api/progress', progress_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/ai', ai_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Vidya Vriksha API is running' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Vidya Vriksha server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map