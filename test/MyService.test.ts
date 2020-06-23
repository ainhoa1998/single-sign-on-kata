import SingleSignOnRegistry from "src/sso/SingleSignOnRegistry";

import MyService from "../src/myservice/MyService";
import Request from "../src/sso/Request";
import SSOToken from "../src/sso/SSOToken";

describe("MyService", () => {
  it("invalid sso token is rejected", () => {
    const service = new MyService(undefined);

    const response = service.handleRequest(new Request("Foo", new SSOToken()));

    expect(response.getText()).not.toEqual("hello Foo!");
  });

  it("valid sso token is accepted", () => {
    const registry: SingleSignOnRegistry = {
      registerNewSession: () => new SSOToken(),
      isValid: () => true,
      unregister: () => {},
    };
    const service = new MyService(registry);

    const response = service.handleRequest(new Request("Foo", new SSOToken()));

    expect(response.getText()).toEqual("hello Foo!");
  });

  it("invalid username and password are rejected", () => {
    const service = new MyService();

    const response = service.handleRegister("aUsername", "aPassword");

    expect(response).toEqual(null);
  });

  it("valid username and password are accepted", () => {
    const token = new SSOToken();
    const registry: SingleSignOnRegistry = {
      registerNewSession: () => token,
      isValid: () => true,
      unregister: () => {},
    };
    const service = new MyService(registry);

    const response = service.handleRegister("aUsername", "aPassword");

    expect(response).toEqual(token);
  });

  it("unregister user", () => {
    let hasUnregisterBeenCalled = false;
    const token = new SSOToken();
    const registry: SingleSignOnRegistry = {
      registerNewSession: () => token,
      isValid: () => true,
      unregister: () => {
        hasUnregisterBeenCalled = true;
      },
    };

    const service = new MyService(registry);

    service.handleUnRegister(token);

    expect(hasUnregisterBeenCalled).toEqual(true);
  });
});
