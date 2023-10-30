import { loginData } from "@/components/login";

export var isAuthenticated = false;

export function setAuthentication(option: boolean) {
  if (option) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
}
