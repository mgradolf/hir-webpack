import SectionService, { config } from "@packages/api/lib/proxy/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findAffiliatedOrgsForSeatGroup(SeatGroupID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.findAffiliatedOrgsForSeatGroup]({
    SeatGroupID
  })
}

export function saveAffiliatedOrg(SeatGroupID: number, AffiliateAccountIDs: number): Promise<IApiResponse> {
  return SectionService[config.Actions.saveAffiliatedOrg]({
    SeatGroupID,
    AffiliateAccountIDs
  })
}

export function getMeetings(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getMeetings]({
    SectionID
  })
}

export function createMeetings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.createMeetings](Params)
}

export function saveMeetings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.saveMeetings](Params)
}

export function updateSection(Params: { [key: string]: any }) {
  return SectionService[config.Actions.updateSection](Params)
}

export function copySection(Params: { [key: string]: any }) {
  return SectionService[config.Actions.copySection](Params)
}

export function saveFinancial(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveFinancial](Params)
}

export function saveFinancials(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveFinancials](Params)
}

export function getSectionFinancials(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionFinancials]({
    SectionID
  })
}

export function getAvailableOfferingFinancials(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableOfferingFinancials]({
    SectionID
  })
}

export function getAvailableFacultyWithFinancials(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableFacultyWithFinancials]({
    SectionID
  })
}

export function getAvailableResourcesWithFinancials(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableResourcesWithFinancials]({
    SectionID
  })
}

export function getAvailableMarketingProgramsWithFinancials(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableMarketingProgramsWithFinancials]({
    SectionID
  })
}

export function removeFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeFinancials](Params)
}