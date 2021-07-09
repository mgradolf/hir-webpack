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
    applyReturnItem: "applyReturnItem",
    applyIssueCredit: "applyIssueCredit",
    getAvailableDiscountByOrderItemID: "getAvailableDiscountByOrderItemID",
    grantDiscountProgram: "grantDiscountProgram",
    getPurchaseOrders: "getPurchaseOrders",
    saveOrderPaymentDueDate: "saveOrderPaymentDueDate"
  }
}
export default ApiMethodFactory(config)
