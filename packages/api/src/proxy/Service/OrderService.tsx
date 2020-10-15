import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "orderService",
  Module: "hir",
  Actions: {
    searchOrders: "searchOrders",
    getOrderDetails: "getOrderDetails",
    getOrderItems: "getOrderItems",
    getOrderLines: "getOrderLines",
    getOrderItemsLit: "getOrderItemsLit",
    getPayments: "getPayments",
    getCredits: "getCredits",
    getReturnItem: "getReturnItem",
    getPurchaseOrder: "getPurchaseOrder"
  }
}
export default ApiMethodFactory(config)
