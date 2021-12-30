const plugin = {
  type: 'languageDetector',
  async: true,
  init: function (services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: async function (callback) {
    let language = await window?.api?.getAppLocale()
    callback(language)
  },
  cacheUserLanguage: function (lng) {
    /* cache language */
  }
}

export default plugin
