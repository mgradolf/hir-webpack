import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "QuestionService",
  Module: "hir",
  Actions: {
    getTagQuestions: "getTagQuestions",
    searchQuestions: "searchQuestions",
    createQuestion: "createQuestion",
    addTagQuestions: "addTagQuestions",
    UpdateTagQuestions: "UpdateTagQuestions",
    removeTagQuestions: "removeTagQuestions",
    searchQuestionResponse: "searchQuestionResponse",
    saveTagAnswer: "saveTagAnswer",
    updateTagQuestion: "updateTagQuestion"
  }
}

export default ApiMethodFactory(config)
