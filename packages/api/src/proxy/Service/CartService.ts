import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "CartService",
  Module: "hir",
  Actions: {
    validateRegistrationRequest: "validateRegistrationRequest",
    launchRegistrationRequest: "launchRegistrationRequest",
    createRegistrationRequest: "createRegistrationRequest"
  }
}

export default ApiMethodFactory(config)
