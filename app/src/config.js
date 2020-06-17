/**
 * ####      Ritmic Front-end APP Configuration      ####
 * #  Author : Wladimir Delenclos  | Licence : RitmicSAS
 * #  URI
 */

const server = process.env.VUE_APP_SERVER_URI || 'http://0.0.0.0'

const config = {
  // Customisable
  entity : "IndustryExample",

  // Back-End
  server_uri : server,
  server_port: 3003,
}

export default config;