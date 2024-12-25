import api from "./api";

export function getCurrentAuth(): AuthUser | undefined {
  
  if (typeof sessionStorage !== "undefined") {
    const user = sessionStorage.getItem("authUser");
    return user ? JSON.parse(user) : undefined;
  }

}
export function setAuthUser(user: AuthUser) {
  sessionStorage.setItem("authUser", JSON.stringify(user));
}

export async function logout() {
  sessionStorage.removeItem("authUser");
  try {
    await api.post("logout");
    
  } catch (error) {
    console.log(error);
  }
}
