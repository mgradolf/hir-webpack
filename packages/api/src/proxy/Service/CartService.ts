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
    applyPromoCodes: "applyPromoCodes",
    createProgramApplicationRequest: "createProgramApplicationRequest",
    validateProgramRequest: "validateProgramRequest",
    createProgramEnrollmentRequest: "createProgramEnrollmentRequest",
    createProductRequest: "createProductRequest",
    validateProductRequest: "validateProductRequest",
    createMembershipRequest: "createMembershipRequest"
  }
}

export default ApiMethodFactory(config)
