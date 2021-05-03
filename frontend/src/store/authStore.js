import { action, makeObservable, observable } from "mobx";
import jsonwebtoken, { TokenExpiredError } from "jsonwebtoken";

export class AuthStore {
  token = null;
  refreshToken = localStorage.getItem("refreshToken") || null;

  constructor() {
    makeObservable(this, {
      _token: observable,
      refreshToken: observable,
      login: action,
      logout: action,
      getNewToken: action,
    });
  }

  // check if token is anytime set as a PROMISE
  get token() {
    return this._token;
  }
  set token(newToken) {
    this._token = newToken;
  }

  login = (token, refreshToken) => {
    this.token = token;
    this.refreshToken = refreshToken;
  };

  logout = () => {
    // Delete refreshtoken from localstorage,
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.clear();
    const deleteRequest = { refreshToken: this.refreshToken };
    this.token = null;
    this.refreshToken = null;
    // Delete token from store
    fetch(process.env.REACT_APP_API_URL + "/logout", {
      method: "DELETE",
      body: JSON.stringify(deleteRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          throw new Error(`Error on logout!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNewToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // Check if refreshtoken is expired
    if (refreshToken) {
      try {
        jsonwebtoken.decode(refreshToken, { complete: true });
        this.refreshToken = refreshToken;
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          console.log("refreshtoken is expired", err);
          this.logout();
        } else {
          console.log("unknown error:", err);
        }
      }
    }
    // Check if token exist and/or is expired
    if (this.token !== null) {
      try {
        jsonwebtoken.decode(this.token, { complete: true });
        return this.token;
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          console.log("token is expired", err);
          this.logout();
        } else {
          console.log("unknown error:", err);
        }
      }
    }
    // Refresh token if token missing
    if (this.refreshToken) {
      let requestBody = { refreshToken: this.refreshToken };
      return fetch(process.env.REACT_APP_API_URL + "/token", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            this.logout();
            throw new Error("Error when refreshing the token!");
          }
          return res.json();
        })
        .then((resData) => {
          localStorage.setItem("refreshToken", resData.refreshToken);
          if (resData.token) {
            this.login(resData.token, resData.refreshToken);
            this.token = resData.token;
            return resData.token;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

export const authStore = new AuthStore();
