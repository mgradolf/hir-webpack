import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "personService",
  Module: "hir",
  Actions: {
    getPersonDetails: "getPersonDetails",
    setUpWebLogin: "setUpWebLogin",
    getPersonLogin: "getPersonLogin",
    getRegions: "getRegions",
    removePersonEducationHistory: "removePersonEducationHistory",
    updatePersonEducationHistory: "updatePersonEducationHistory",
    createPersonEducationHistory: "createPersonEducationHistory",
    findPersonEducationHist: "findPersonEducationHist",
    getPersonDisabilities: "getPersonDisabilities",
    savePersonDisabilities: "savePersonDisabilities",
    getFacultySchedule: "getFacultySchedule"
  }
}

export default ApiMethodFactory(config)
