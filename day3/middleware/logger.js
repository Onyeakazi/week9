const logger = (req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Move to the next middleware or router in line
};

module.exports = logger;