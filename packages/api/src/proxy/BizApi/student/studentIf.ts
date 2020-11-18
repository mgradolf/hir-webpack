import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.student.StudentIF",
  Module: "hir",
  Actions: {
    searchStudents: "searchStudents"
  }
}

export default ApiMethodFactory(config)
