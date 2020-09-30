import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "QuestionService",
  Module: "hir",
  Actions: {
    getTagQuestions: "getTagQuestions",
    addTagQuestions: "addTagQuestions",
    removeTagQuestions: "removeTagQuestions",
    saveTagAnswer: "saveTagAnswer",
    updateTagQuestion: "updateTagQuestion"
  }
}

export default ApiMethodFactory(config)
