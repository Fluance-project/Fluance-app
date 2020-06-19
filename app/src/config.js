const server = process.env.VUE_APP_SERVER_URI || 'http://0.0.0.0'

const config = {
  // Customisable
  entity : "IndustryExample",

  // Back-End
  server_uri : server,
  server_port: 5000,
}

export default config;