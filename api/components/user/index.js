const ctrl = require("./controller");
// const store = require("../../../store/mysql");
// const store = require("../../../store/remote-mysql");

let store;
if (config.remoteDB === true) {
  store = require("../../../store/remote-mysql");
} else {
  store = require("../../../store/mysql");
}

module.exports = ctrl(store);
