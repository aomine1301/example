import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// Common
import common from './ru/_common.json'
import error from './ru/_error.json'

/* eslint import/no-named-as-default: 0 */
// Page
import vlan from './ru/vlan.json'
import ripe from './ru/ripe.json'
import employee from './ru/employee.json'

const resources = {
  ru: {
    // Common
    common,
    error, // validate field

    // Page
    vlan,
    ripe,
    employee,
  },
} as const

export default i18n.use(initReactI18next).init({
  lng: 'ru',
  resources,
})
