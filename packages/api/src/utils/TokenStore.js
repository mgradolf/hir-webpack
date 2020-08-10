// interface Tokens {
//   access_token: string
//   refresh_token: string
// }
"use strict";
function setTokens(token) {
    localStorage.setItem("access_token", token);
    // localStorage.setItem("refresh_token", tokens.refresh_token)
}
exports.setTokens = setTokens;
function getToken() {
    return localStorage.getItem("access_token");
}
exports.getToken = getToken;
// export function getRefreshToken(): string | null {
//   return localStorage.getItem("refresh_token")
// }
function removeTokens() {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token")
}
exports.removeTokens = removeTokens;
