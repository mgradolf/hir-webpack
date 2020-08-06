import callBizApi from "../../../utils/CallBizApi"

const Module = "hir"
const Service = "com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF"

export const findCatalogs = (Params: any): Promise<any> => callBizApi(Service, "findCatalogs", Params, Module)
