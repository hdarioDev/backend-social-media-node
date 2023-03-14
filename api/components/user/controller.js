const { nanoid } = require("nanoid");
const auth = require("../auth");
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

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };
    user.id = body.id || nanoid();
    console.log("🚀 ~ file: controller.js:25 ~ upsert ~ user:", user);

    if (body.password || body.username) {
      user.username = body.username;
      user.password = body.password;
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: user.password,
      });
    }

    return store.upsert(TABLA, user);
  }

  function follow(from, to) {
    return store.upsert(TABLA + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: user };
    return await store.query(TABLA + "_follow", query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
