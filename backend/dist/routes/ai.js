"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offlineKnowledge_1 = require("../services/offlineKnowledge");
const llmService_1 = require("../services/llmService");
const router = express_1.default.Router();
router.post('/query', async (req, res) => {
    try {
        const { question, language = 'english', offline = false } = req.body;
        let response;
        if (offline) {
            response = await offlineKnowledge_1.offlineKnowledgeBase.query(question, language);
        }
        else {
            response = await llmService_1.onlineLLMService.query(question, language);
        }
        res.json({
            question,
            answer: response.answer,
            sources: response.sources,
            language,
            mode: offline ? 'offline' : 'online'
        });
    }
    catch (error) {
        console.error('AI query error:', error);
        res.status(500).json({ error: 'Failed to process query' });
    }
});
exports.default = router;
//# sourceMappingURL=ai.js.map