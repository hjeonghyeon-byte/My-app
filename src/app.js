const express = require('express');
const app = express();

app.use(express.json());

// Generic API error handler
const handleApiError = (error, operation) => {
  console.error(`API Error during ${operation}:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
};

// Mock external data fetcher (replace with real integration if needed)
async function fetchExternalData() {
  // Simulate async workload; replace with real fetch/DB call
  return {
    items: [
      { id: 1, value: 'alpha' },
      { id: 2, value: 'beta' },
      { id: 3, value: 'gamma' }
    ],
    fetchedAt: new Date().toISOString()
  };
}

// Example API endpoint with error handling
app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchExternalData();
    res.json(data);
  } catch (error) {
    handleApiError(error, 'fetchExternalData');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export app for server or tests
module.exports = app;
