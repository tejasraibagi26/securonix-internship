const bcrpyt = require("bcryptjs");
const saltRounds = 16;
const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;

const login = async (username, password) => {
  if (!username || !password) {
    throw "You must provide an username and password";
  }

  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (!user) {
    throw "No user with that username";
  }

  const isPasswordCorrect = await bcrpyt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw "Incorrect password";
  }

  return user;
};

const register = async (username, password) => {
  if (!username || !password) {
    throw "You must provide an username and password";
  }

  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (user) {
    throw "User already exists";
  }

  const hash = await bcrpyt.hash(password, saltRounds);
  const newUser = {
    username: username,
    password: hash,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not add user";

  const newId = insertInfo.insertedId;
  const getUser = await userCollection.findOne({ _id: newId });
  return getUser;
};

module.exports = {
  login,
  register,
};
