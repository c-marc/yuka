import { createContext, useContext } from "react";

// Create separate context
export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

// Helpers
export function useAuth() {
  return useContext(AuthContext);
}
export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
