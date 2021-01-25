import SectionService, { config } from "@packages/api/lib/proxy/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addOfferingFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.addOfferingFinancials](Params)
}

export function addInstructorFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.addInstructorFinancials](Params)
}

export function addMarketingProgramFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.addMarketingProgramFinancials](Params)
}

export function addResourceFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.addResourceFinancials](Params)
}

export function addSectionDiscount(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.addSectionDiscount](Params)
}

export function getSectionDetails(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionDetails]({
    SectionID
  })
}

export function getSectionStatistics(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionStatistics]({
    SectionID
  })
}

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

export function getMeetings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.getMeetings](Params)
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

export function getSectionFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionFinancials](Params)
}

export function getSectionFinancialsCombined(SeatGroupID?: number, SectionID?: number): Promise<IApiResponse> {
  return Promise.all([getSectionFinancials({ SectionID, SeatGroupID }), getSectionFinancials({ SectionID })]).then(
    (responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      if (response1.success && response2.success) {
        Object.keys(response2.data).forEach((sectionFinancial: any) => {
          response2.data[sectionFinancial]["IsPublished"] = false
          Object.keys(response1.data).forEach((seatGroupFinancial: any) => {
            if (
              response2.data[sectionFinancial].SectionFinancialID ===
              response1.data[seatGroupFinancial].SectionFinancialID
            ) {
              response2.data[sectionFinancial]["IsPublished"] = true
              return false
            }
          })
        })
        return response2
      } else if (response2.success) {
        return response2
      } else {
        return response1
      }
    }
  )
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

export function saveSectionDiscount(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveSectionDiscount](Params)
}

export function removeSectionDiscounts(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeSectionDiscounts](Params)
}

export function getSectionDiscounts(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionDiscounts](Params)
}

export function getAvailableDiscountPrograms(SectionID: number): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableDiscountPrograms]({
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

export function saveSectionNotification(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.saveSectionNotification](Params)
}

export function getSectionNotifications(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionNotifications](Params)
}

export function removeFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeFinancials](Params)
}

export function removeMeetings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeMeetings](Params)
}

export function removeLocations(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeLocations](Params)
}

export function removeInstructors(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeInstructors](Params)
}

export function removeMeetingInformations(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.removeMeetingInformations](Params)
}

// export function findRoom(Params: { [key: string]: any }) {
//   return SectionService[config.Actions.findRoom](Params)
// }

export function saveLocations(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveLocations](Params)
}

export function saveGeneralComment(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveGeneralComment](Params)
}

export function saveFacultyComment(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveFacultyComment](Params)
}

export function saveEnrollmentComment(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveEnrollmentComment](Params)
}

export function findGeneralCommentHistory(Params: { [key: string]: any }) {
  return SectionService[config.Actions.findGeneralCommentHistory](Params)
}

export function findFacultyComments(Params: { [key: string]: any }) {
  return SectionService[config.Actions.findFacultyComments](Params)
}

export function findEnrollmentCommentHistory(Params: { [key: string]: any }) {
  return SectionService[config.Actions.findEnrollmentCommentHistory](Params)
}

export function findFaculty(Params: { [key: string]: any }) {
  return SectionService[config.Actions.findFaculty](Params)
}

export function findEnrollmentStudentHistory(Params: { [key: string]: any }) {
  return SectionService[config.Actions.findEnrollmentStudentHistory](Params)
}

export function scheduleInstructor(Params: { [key: string]: any }) {
  return SectionService[config.Actions.scheduleInstructor](Params)
}

export function saveMeetingInformations(Params: { [key: string]: any }) {
  return SectionService[config.Actions.saveMeetingInformations](Params)
}
