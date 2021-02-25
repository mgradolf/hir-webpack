import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.scheduling.SchedulingIF",
  Module: "hir",
  Actions: {
    findMeetingTypes: "findMeetingTypes",
    findPossibleSites: "findPossibleSites",
    findPossibleBuildings: "findPossibleBuildings",
    findPossibleRooms: "findPossibleRooms",
    findQualifiedInstructors: "findQualifiedInstructors",
    findInformationTypes: "findInformationTypes",
    removeSchedule: "removeSchedule"
  }
}

export default ApiMethodFactory(config)
