import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.financial.server.bizapi.gl.GeneralLedgerIF",
  Module: "hir",
  Actions: {
    saveGLAccountMapping: "saveGLAccountMapping",
    findGLAccountMapping: "findGLAccountMapping"
  }
}

export default ApiMethodFactory(config)
