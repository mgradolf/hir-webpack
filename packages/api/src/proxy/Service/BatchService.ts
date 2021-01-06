import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "BatchService",
  Module: "batchimport",
  Actions: {
    findBatches: "findBatches"
  }
}

export default ApiMethodFactory(config)
