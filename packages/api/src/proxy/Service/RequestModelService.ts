import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "requestService",
  Module: "requestmodel",
  Actions: {
    retry: "retry",
    cancel: "cancel"
  }
}

export default ApiMethodFactory(config)
