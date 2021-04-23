import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.registration.PreferencesIF",
  Module: "hir",
  Actions: {
    getPreference: "getPreference"
  }
}

export default ApiMethodFactory(config)
