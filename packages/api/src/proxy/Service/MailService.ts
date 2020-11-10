import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "mailService",
  Module: "hir",
  Actions: {
    sendEmail: "sendEmail",
    sendRegistrationConfirmationEmail: "sendRegistrationConfirmationEmail"
  }
}

export default ApiMethodFactory(config)
