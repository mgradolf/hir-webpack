import ApiMethodFactory, { Iconfig } from "../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/hirServlet",
  Service: "commentService",
  Module: "hir",
  Actions: {
    addStudentComment: "addStudentComment",
    addFacultyComment: "addFacultyComment",
    addEnrollmentComment: "addEnrollmentComment",
    addSectionComment: "addSectionComment",
    addSectionFacultyComment: "addSectionFacultyComment",
    findStudentComments: "findStudentComments",
    findFacultyComments: "findFacultyComments",
    findEnrollmentComments: "findEnrollmentComments",
    findSectionComments: "findSectionComments",
    findSectionFacultyComments: "findSectionFacultyComments",
    deleteStudentComment: "deleteStudentComment",
    deleteFacultyComment: "deleteFacultyComment",
    deleteEnrollmentComment: "deleteEnrollmentComment",
    deleteSectionComment: "deleteSectionComment",
    deleteSectionFacultyComment: "deleteSectionFacultyComment"
  }
}

export default ApiMethodFactory(config)
