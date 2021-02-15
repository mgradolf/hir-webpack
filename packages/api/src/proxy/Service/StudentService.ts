import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "studentService",
  Module: "hir",
  Actions: {
    pushStudent: "pushStudent",
    removeStudent: "removeStudent",
    createUpdateStudentHold: "createUpdateStudentHold",
    releaseStudentHold: "releaseStudentHold",
    searchStudentSchedule: "searchStudentSchedule",
    searchOnlineClasses: "searchOnlineClasses"
  }
}

export default ApiMethodFactory(config)
