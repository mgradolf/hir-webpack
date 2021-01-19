import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.system.JobSchedulerIF",
  Module: "hir",
  Actions: {
    findJobSchedules: "findJobSchedules"
  }
}

export default ApiMethodFactory(config)
