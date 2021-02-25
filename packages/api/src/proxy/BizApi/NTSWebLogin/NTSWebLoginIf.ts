import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.util.NTSWebLoginIF",
  Module: "hir",
  Actions: {
    updateLoginInfo: "updateLoginInfo",
    unlockPersonLogin: "unlockPersonLogin",
    sendPasswordResetEmail: "sendPasswordResetEmail"
  }
}

export default ApiMethodFactory(config)
