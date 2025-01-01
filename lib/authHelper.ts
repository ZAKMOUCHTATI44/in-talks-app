import api from "./api";

export function getCurrentAuth(): AuthUser | undefined {
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : undefined;
  }
}
export function setAuthUser(user: AuthUser) {
  localStorage.setItem("authUser", JSON.stringify(user));
}

export async function logout() {
  localStorage.removeItem("authUser");

  try {
    await api.get("logout");
  } catch (error) {
    console.log(error);
  }
}
