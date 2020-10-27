import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.registration.WaitListIF",
  Module: "hir",
  Actions: {
    findWaitListEntries: "findWaitListEntries"
  }
}

export default ApiMethodFactory(config)
