import QuestionService, { config } from "@packages/api/lib/proxy/Service/QuestionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getTagQuestions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.getTagQuestions](Params)
}
export function searchQuestions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.searchQuestions](Params)
}
export function createQuestion(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.createQuestion](Params)
}
export function addTagQuestions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.addTagQuestions](Params)
}
export function UpdateTagQuestions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.UpdateTagQuestions](Params)
}
export function removeTagQuestions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.removeTagQuestions](Params)
}
export function searchQuestionResponse(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.searchQuestionResponse](Params)
}
export function saveTagAnswer(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.saveTagAnswer](Params)
}
export function saveTagAnswers(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.saveTagAnswers](Params)
}
export function updateTagQuestion(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.updateTagQuestion](Params)
}
