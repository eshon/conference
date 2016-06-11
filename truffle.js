module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js",
      "javascripts/lightwallet.min.js",
      "javascripts/hooked-web3-provider.min.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    "Conference"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};

