const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const path = require('path')

function initI18Next(lang) {
  let fileName = path.join(__dirname, `../build/locales/{{lng}}/{{ns}}.json`)

  i18next.use(Backend).init({
    initImmediate: false,
    debug: false,
    ns: 'backend',
    defaultNS: 'backend',
    fallbackNS: 'backend',
    lng: lang,
    backend: {
      loadPath: fileName
    }
  })

  return i18next
}

module.exports = {
  initI18Next
}
