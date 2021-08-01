const { hashSync, compareSync } = require('bcrypt')

const hashPassword = (passwordInput) => {
  return hashSync(passwordInput, 10)
}

const verifyPassword = (passwordInput, passwordHash, callback) => {
  const isMatch = compareSync(passwordInput, passwordHash)
  return isMatch
    ? callback(isMatch, 'Password match')
    : callback(isMatch, 'Incorrect password')
}

module.exports = {
  hashPassword,
  verifyPassword,
}
