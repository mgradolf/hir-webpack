import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.student.StudentHoldIF",
  Module: "hir",
  Actions: {
    findStudentHold: "findStudentHold"
  }
}

export default ApiMethodFactory(config)
