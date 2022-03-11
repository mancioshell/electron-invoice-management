const fs = require('fs')
const glob = require('glob')
const AdmZip = require('adm-zip')

const n = 5

const getOldestBackup = async (userData) => {
  return new Promise((resolve, reject) => {
    glob(`**/*.zip`, { cwd: `${userData}/db` }, function (er, files) {
      if (files.length <= n) resolve(null)
      let oldest = files
        .map((file) =>
          file.substring(file.indexOf('.') + 1, file.lastIndexOf('.'))
        )
        .reduce((curr, next) =>
          Date.parse(curr) > Date.parse(next) ? next : curr
        )
      resolve(`${userData}/db/backup.${oldest}.zip`)
    })
  })
}

const backupDatabases = async (userData) => {
  const ts = Date.now()

  let dateObj = new Date(ts)
  let date = dateObj.getDate()
  let month = dateObj.getMonth() + 1
  let year = dateObj.getFullYear()

  const zip = new AdmZip()
  if (fs.existsSync(`${userData}/db/invoice.db`))
    zip.addLocalFile(`${userData}/db/invoice.db`)
  if (fs.existsSync(`${userData}/db/customers.db`))
    zip.addLocalFile(`${userData}/db/customers.db`)
  if (fs.existsSync(`${userData}/db/settings.db`))
    zip.addLocalFile(`${userData}/db/settings.db`)

  if (zip.getEntries().length > 0)
    zip.writeZip(`${userData}/db/backup.${date}-${month}-${year}.zip`)

  let oldestFile = await getOldestBackup(userData)

  if (oldestFile) fs.unlinkSync(oldestFile)
}

module.exports.backupDatabases = backupDatabases
