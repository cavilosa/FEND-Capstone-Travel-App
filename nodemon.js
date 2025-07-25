{
  "watch": ["src/server"],
  "ext": "js,json",
  "ignore": ["dist", "node_modules"],
  "exec": "node src/server/server.js",
  "verbose": true,
  "events": {
    "restart": "echo 🔄 Nodemon restarted due to file changes"
  }
}
