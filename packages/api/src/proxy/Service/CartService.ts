import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "CartService",
  Module: "hir",
  Actions: {
    validateRegistrationRequest: "validateRegistrationRequest",
    launchRegistrationRequest: "launchRegistrationRequest",
    createRegistrationRequest: "createRegistrationRequest",
    createOptionalItemRequest: "createOptionalItemRequest",
    createProgramApplicationRequest: "createProgramApplicationRequest",
    validateProgramRequest: "validateProgramRequest"
  }
}

export default ApiMethodFactory(config)
