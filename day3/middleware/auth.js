const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  // Check if API key is present and correct (no database needed for basic token matches!)
  if (apiKey === 'supersecret123') {
    next(); // Pass control to the next handler (the controller logic)
  } else {
    res.status(401).json({ success: false, error: "Unauthorized: Invalid or missing API Key" });
  }
};

module.exports = checkApiKey;