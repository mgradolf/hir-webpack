import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.financial.server.bizapi.order.OrderIF",
  Module: "hir",
  Actions: {
    findOrders: "findOrders",
    findOrderDetails: "findOrderDetails",
    findOrderLineWiseBalance: "findOrderLineWiseBalance",
    findCreditMemosOrderLines: "findCreditMemosOrderLines"
  }
}

export default ApiMethodFactory(config)
