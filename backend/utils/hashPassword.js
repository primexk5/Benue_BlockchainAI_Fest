
const bcrypt = require('bcryptjs');

const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error('Usage: node utils/hashPassword.js <your-password>');
  process.exit(1);
}

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('\nYour bcrypt hash (copy this to ADMIN_PASSWORD_HASH in .env):\n');
  console.log(hash);
  console.log('');
});
