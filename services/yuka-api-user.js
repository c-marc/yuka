// Need userToken, but we cant use context outside of RC.
// Either read it in SecureStorage or pass it as arg (chosen option)

// Build axios headers
function optionsFrom(userToken) {
  return { headers: { Authorization: `Bearer ${userToken}` } };
}

export const fakeUser = {
  email: "nono@reacteur.io",
  username: "nono",
  password: "azerty",
  userToken: "666",
};

export async function createUser(data) {
  try {
    // fake axios.post("...", data)
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: fakeUser });
      }, 2000);
    });
    return result.data;
  } catch (error) {
    // API failed
    if (error.response?.data.error.message) {
      throw new Error(error.response?.data.error.message);
    } else {
      throw new Error("User creation failed");
    }
  }
}

export async function authenticateUser(data) {
  try {
    // fake axios.post("...", data)
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          data.email !== fakeUser.email ||
          data.password !== fakeUser.password
        ) {
          reject({
            data: {
              response: { data: { error: { message: "Unauthorized" } } },
            },
          });
        }
        resolve({ data: fakeUser });
      }, 2000);
    });
    return result.data;
  } catch (error) {
    // API failed
    if (error.response?.data.error.message) {
      throw new Error(error.response?.data.error.message);
    } else {
      throw new Error("User authentification failed");
    }
  }
}

export async function getUser(userToken) {
  try {
    // for axios
    const options = optionsFrom(userToken);
    // fake axios.get("...", options)
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userToken !== fakeUser.userToken) {
          reject({
            data: {
              response: { data: { error: { message: "Unauthorized" } } },
            },
          });
        }
        resolve({ data: fakeUser });
      }, 2000);
    });
    return result.data;
  } catch (error) {
    // API failed
    if (error.response?.data.error.message) {
      throw new Error(error.response?.data.error.message);
    } else {
      throw new Error("Getting user data failed");
    }
  }
}
