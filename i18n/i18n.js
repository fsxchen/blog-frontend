const en = require('../locales/en-US.js')
const zh = require('../locales/zh-CN.js')

const I18N = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文'
    }
  ],
  defaultLocale: 'zh',
  routes: {
    'article/_id': {
      en: '/articles/:id',
      zh: '/articulo/:id'
    },
    'article': {
      en: '/articles',
      zh: '/articles'
    }
  },
  vueI18n: {
    fallbackLocale: 'zh',
    messages: { en, zh }
  }
}

module.exports = {
  I18N
};
