import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "ReportService",
  Module: "hir",
  Actions: {
    getReportList: "getReportList",
    getReportByReportName: "getReportByReportName"
  }
}

export default ApiMethodFactory(config)
