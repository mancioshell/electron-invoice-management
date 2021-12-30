const plugin = {
  type: 'backend',
  init: function (services, backendOptions, i18nextOptions) {
    /* use services and options */
  },
  read: function (language, namespace, callback) {
    window.api.getLocalFile(language, namespace, (err, data) => {
      if (err) return callback(err, null)
      return callback(null, JSON.parse(data))
    })
  },

  // only used in backends acting as cache layer
  save: function (language, namespace, data) {
    // store the translations
  },

  create: function (languages, namespace, key, fallbackValue) {
    /* save the missing translation */
  }
}

export default plugin
