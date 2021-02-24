import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const phoneConfig = {
  EndPoint: "api/hirServlet",
  Service: "personPhoneService",
  Module: "hir",
  Actions: {
    pushPersonPhone: "pushPersonPhone",
    deletePersonPhone: "deletePersonPhone"
  }
}

export default ApiMethodFactory(phoneConfig)
