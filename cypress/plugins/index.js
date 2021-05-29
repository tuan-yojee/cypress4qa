/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  console.log(config.env)

  // if version not defined, use local
  const version = config.env.version || 'local'

  // load env from json
  config.env = require(`../config/${version}.json`)

  // change baseUrl
  config.baseUrl = config.env.baseUrl
  
  // if (config.env.version === 'prod') {
  //   config.baseUrl = ''
  //   config.env.api = 'v2'
  //   config.env.redirect = ''
  // }

  return config
}
