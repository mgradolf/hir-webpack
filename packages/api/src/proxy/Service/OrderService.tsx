import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "orderService",
  Module: "hir",
  Actions: {
    searchOrders: "searchOrders"
  }
}
export default ApiMethodFactory(config)
