const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

module.exports = () => {
  const envPath = path.resolve(__dirname, '../.env')

  const envFile = fs.existsSync(envPath) ? dotenv.config({ path: envPath }) : { parsed: {} }
  const envVars = envFile.parsed || {}

  const formatted = Object.entries(envVars)
    .filter(([key]) => key.startsWith('REACT_APP_'))
    .reduce(
      (acc, [key, val]) => {
        acc[`process.env.${key}`] = JSON.stringify(val)
        return acc
      },
      {}
    )

  return formatted
}
