import QuestionService, { config } from "@packages/api/lib/proxy/Service/QuestionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getTagQuestions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.getTagQuestions](Params, Headers)
}
export function searchQuestions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.searchQuestions](Params, Headers)
}
export function createQuestion(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.createQuestion](Params, Headers)
}
export function addTagQuestions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.addTagQuestions](Params, Headers)
}
export function UpdateTagQuestions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.UpdateTagQuestions](Params, Headers)
}
export function removeTagQuestions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.removeTagQuestions](Params, Headers)
}
export function searchQuestionResponse(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.searchQuestionResponse](Params, Headers)
}
export function saveTagAnswer(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return QuestionService[config.Actions.saveTagAnswer](Params, Headers)
}
export function saveTagAnswers(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.saveTagAnswers](Params, Headers)
}
export function updateTagQuestion(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QuestionService[config.Actions.updateTagQuestion](Params, Headers)
}
