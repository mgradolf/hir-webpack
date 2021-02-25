import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "AnonymizationRequestService",
  Module: "hir",
  Actions: {
    createAnonymizationRequest: "createAnonymizationRequest",
    getAnonymizeRequests: "getAnonymizeRequests"
  }
}

export default ApiMethodFactory(config)
