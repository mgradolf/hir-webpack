import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "studentService",
  Module: "hir",
  Actions: {
    searchStudentSchedule: "searchStudentSchedule",
    searchOnlineClasses: "searchOnlineClasses"
  }
}

export default ApiMethodFactory(config)
