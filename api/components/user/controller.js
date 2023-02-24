const { nanoid } = require("nanoid");
const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    console.log("id ", id);
    return store.get(TABLA, id);
  }

  function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };

    user.id = body.id || nanoid();

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
