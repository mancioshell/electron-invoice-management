const fs = require('fs')
const path = require('path')

module.exports = {
  getLocalFile: async (language, namespace, callback) => {
    let fileName = path.join(
      __dirname,
      `../../build/locales/${language}/${namespace}.json`
    )
    fs.readFile(fileName, 'utf8', callback)
  }
}
