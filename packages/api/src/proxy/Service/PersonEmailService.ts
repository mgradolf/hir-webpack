import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const emailConfig = {
  EndPoint: "api/hirServlet",
  Service: "personEmailService",
  Module: "hir",
  Actions: {
    pushPersonEmail: "pushPersonEmail",
    deletePersonEmail: "deletePersonEmail"
  }
}

export default ApiMethodFactory(emailConfig)
