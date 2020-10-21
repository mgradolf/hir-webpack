import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "orderService",
  Module: "hir",
  Actions: {
    searchOrders: "searchOrders",
    getOrderItems: "getOrderItems",
    getOrderDetails: "getOrderDetails",
    getOrderLines: "getOrderLines",
    getOrderItemsLit: "getOrderItemsLit",
    getPayments: "getPayments",
    getCredits: "getCredits",
    getReturnItems: "getReturnItems",
    getPurchaseOrder: "getPurchaseOrder",
    getCreditMemoDataByOrderItemID: "getCreditMemoDataByOrderItemID",
    applyReturnItem: "applyReturnItem"
  }
}
export default ApiMethodFactory(config)
