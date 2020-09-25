import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.scheduling.SchedulingIF",
  Module: "hir",
  Actions: {
    findMeetingTypes: "findMeetingTypes",
    findPossibleSites: "findPossibleSites",
    findPossibleBuildings: "findPossibleBuildings",
    findPossibleRooms: "findPossibleRooms",
    findQualifiedInstructors: "findQualifiedInstructors",
    findInformationTypes: "findInformationTypes"
  }
}

export default ApiMethodFactory(config)
