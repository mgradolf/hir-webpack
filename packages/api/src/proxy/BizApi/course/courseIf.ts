import callBizApi from "../../../utils/CallBizApi"

const Module = "hir"
const Service = "com.jenzabar.jxntm.server.bizapi.catalog.CourseIF"

export const getSection = (Params: any): Promise<any> => callBizApi(Service, "getSection", Params, Module)
