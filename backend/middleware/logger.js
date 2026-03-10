const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'admin.log');


if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}


function adminLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const adminEmail = req.admin ? req.admin.email : 'unknown';
  const method = req.method;
  const url = req.originalUrl;

  const logEntry = `[${timestamp}] ADMIN ACCESS | IP: ${ip} | Admin: ${adminEmail} | ${method} ${url}\n`;

  fs.appendFile(logFile, logEntry, err => {
    if (err) {
      console.error('[Logger] Failed to write admin log:', err.message);
    }
  });

  next();
}

module.exports = adminLogger;
