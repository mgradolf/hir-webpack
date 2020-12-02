import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramEnrollmentIF",
  Module: "hir",
  Actions: {
    searchEnrollment: "searchEnrollment"
  }
}

export default ApiMethodFactory(config)
