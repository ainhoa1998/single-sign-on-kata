import SSOToken from "./SSOToken";

export default interface SingleSignOnRegistry {
  registerNewSession(userName: string, password: string): SSOToken;

  isValid(token: SSOToken): boolean;

  unregister(token: SSOToken): void;
}
