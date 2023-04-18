import { isEnumMember } from "typescript";
import { roleType } from "../models/roleType";

export function canAccess() {
  if (
    window.localStorage.getItem("token") != null ||
    window.sessionStorage.getItem("token") != null
  ) {
    return true;
  }
  return false;
}

export function canAccessRoles(allowedRoles: roleType[]) {
  let token =
    window.localStorage.getItem("token") ??
    window.sessionStorage.getItem("token");

  if (token == null) return false;
  try {
    let properties = atob(token.split(".")[1]);
    let userInfo = JSON.parse(properties);
    let roles = new Array<string>();
    if (Array.isArray(userInfo.role)) {
      let aux: Array<string> = userInfo.role;
      aux.forEach((el) => roles.push(el));
    } else roles.push(userInfo.role);

    for (let i = 0; i < roles.length; i++) {
      if (allowedRoles.find((r) => r === roles[i])) return true;
    }
    return false;
  } catch {
    return false;
  }
}
