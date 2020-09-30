import QuestionService, { config } from "@packages/api/lib/proxy/Service/QuestionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getTagQuestions(Params: { [key: string]: string }): Promise<IApiResponse> {
  return QuestionService[config.Actions.getTagQuestions](Params)
}

export function addTagQuestions(Params: { [key: string]: string }): Promise<IApiResponse> {
  return QuestionService[config.Actions.addTagQuestions](Params)
}

export function removeTagQuestions(Params: { [key: string]: string }): Promise<IApiResponse> {
  return QuestionService[config.Actions.removeTagQuestions](Params)
}

export function saveTagAnswer(Params: { [key: string]: string }): Promise<IApiResponse> {
  return QuestionService[config.Actions.saveTagAnswer](Params)
}

export function UpdateTagQuestions(Params: { [key: string]: string }): Promise<IApiResponse> {
  return QuestionService[config.Actions.UpdateTagQuestions](Params)
}
