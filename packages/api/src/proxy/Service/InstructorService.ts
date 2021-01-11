import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "instructorService",
  Module: "hir",
  Actions: {
    addInstructorToOffering: "addInstructorToOffering",
    removeInstructorFromOffering: "removeInstructorFromOffering",
    searchSectionInstructor: "searchSectionInstructor",
    searchInstructorOfferings: "searchInstructorOfferings"
  }
}

export default ApiMethodFactory(config)
