import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.scheduling.SchedulingIF",
  Module: "hir",
  Actions: {
    findPossibleSites: "findPossibleSites",
    findPossibleBuildings: "findPossibleBuildings",
    findPossibleRooms: "findPossibleRooms",
    findQualifiedInstructors: "findQualifiedInstructors",
    findInformationTypes: "findInformationTypes"
  }
}

export default ApiMethodFactory(config)
