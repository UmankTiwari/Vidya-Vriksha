import express from 'express';
import { offlineKnowledgeBase } from '../services/offlineKnowledge';
import { onlineLLMService } from '../services/llmService';

const router = express.Router();

router.post('/query', async (req, res) => {
  try {
    const { question, language = 'english', offline = false } = req.body;
    
    let response;
    if (offline) {
      response = await offlineKnowledgeBase.query(question, language);
    } else {
      response = await onlineLLMService.query(question, language);
    }
    
    res.json({
      question,
      answer: response.answer,
      sources: response.sources,
      language,
      mode: offline ? 'offline' : 'online'
    });
  } catch (error) {
    console.error('AI query error:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

export default router;
