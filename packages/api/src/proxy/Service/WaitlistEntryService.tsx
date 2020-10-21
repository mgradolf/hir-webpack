import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "waitListEntry",
  Module: "hir",
  Actions: {
    saveWaitListEntry: "saveWaitListEntry",
    deleteWaitListEntry: "deleteWaitListEntry"
  }
}

export default ApiMethodFactory(config)
