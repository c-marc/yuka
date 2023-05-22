import { useReducer, useEffect, useMemo } from "react";
import * as SecureStore from "expo-secure-store";

import { AuthContext, AuthDispatchContext } from "./auth-contexts.js";
import { authenticateUser } from "../services/yuka-api.js";

// Reducer
// - handle combined states
// - keep it pure
function authReducer(prevState, action) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
}

// Initial state
const initialAuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

export default function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  // This is inspired from the authflow guide of native navigation
  // But we follow the state / dispatch separation pattern from react doc
  // Because we're doing async stuffs, the idea is to keep the reducer pure, and to provide these handling functions in context rather than the dispatch we get from useReducer... I think that makes sense... (?)
  // UseMemo (and not useCallback) because we're making an object of functions (and not a function)
  const authDispatch = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        let userToken;
        try {
          const user = await authenticateUser(data);
          userToken = user.userToken;
          await SecureStore.setItemAsync("userToken", userToken);
        } catch (e) {
          console.info(e.message);
          // rethrow or dispatch error?
          throw e;
        }

        dispatch({ type: "SIGN_IN", token: userToken });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        let userToken; // undefined
        try {
          const user = await createUser(data);
          userToken = user.userToken;
          await SecureStore.setItemAsync("userToken", userToken);
        } catch (e) {
          console.info(e.message);
          // rethrow or dispatch error?
          throw e;
        }

        dispatch({ type: "SIGN_IN", token: userToken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
