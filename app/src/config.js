const server = process.env.VUE_APP_SERVER_URI || 'http://0.0.0.0'

const config = {
  // Customisable
  entity : "",

  // Back-End
  server_uri : server,
  server_port: 5000,
  server_route: '/api/v1/',
}

export default config;