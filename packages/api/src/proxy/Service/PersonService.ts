import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "personService",
  Module: "hir",
  Actions: {
    createPersonRecordInRoles: "createPersonRecordInRoles",
    getPersonDetails: "getPersonDetails",
    setupWebLogin: "setupWebLogin",
    getPersonLogin: "getPersonLogin",
    getRegions: "getRegions",
    pushPerson: "pushPerson",
    canPushPerson: "canPushPerson",
    removePerson: "removePerson",
    getDegreeProgram: "getDegreeProgram",
    removePersonEducationHistory: "removePersonEducationHistory",
    updatePersonEducationHistory: "updatePersonEducationHistory",
    createPersonEducationHistory: "createPersonEducationHistory",
    findPersonEducationHist: "findPersonEducationHist",
    getPersonDisabilities: "getPersonDisabilities",
    savePersonDisabilities: "savePersonDisabilities",
    getFacultySchedule: "getFacultySchedule",
    findPersonsByAccount: "findPersonsByAccount"
  }
}

export default ApiMethodFactory(config)
