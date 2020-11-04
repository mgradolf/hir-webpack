import { useState, useEffect } from "react"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import { eventBus, REFRESH_SECTION_PAGE } from "~/utils/EventBus"

interface ISectionFilterValues {
  OfferingCode: string
  OfferingName: string
  Coordinator: string
  IsQuickAdmit: string
  SectionNumber: string
  SectionFacultyFirstName: string
  SectionFacultyLastName: string
  FromStartDate: string
  ToStartDate: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
  MeetsOn: string
  MeetingType: string
  SectionStatusCodeID: string
  OrganizationID: string
  ComboSearchTagHierarchy: string
  ComboSearchTagTypeIDHierarchy: string
  TagName: string
  TagTypeID: string
  SiteID: string
  BuildingID: string
  RoomID: string
}

export function useSections(
  filterData: ISectionFilterValues,
  offeringID: number | undefined = undefined
): [boolean, any[]] {
  const [sectionItems, setSectionItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadSections = async function () {
      setLoading(true)
      const params: { [key: string]: any } = filterData
      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (
          params[key] === undefined ||
          params[key] === null ||
          params[key] === "" ||
          params[key] === "0" ||
          params[key] === 0
        ) {
          delete params[key]
        }
        if (!isNaN(Number(params[key]))) {
          params[key] = Number(params[key])
        }
      })
      const result = await searchSection([{ ...params, OfferingID: offeringID }])

      if (result && result.success) {
        setSectionItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_SECTION_PAGE, loadSections)
    eventBus.publish(REFRESH_SECTION_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_PAGE)
    }
  }, [filterData, offeringID])

  return [loading, sectionItems]
}

const INITIAL_SECTION_FILTER_DATA: ISectionFilterValues = {
  OfferingCode: "",
  OfferingName: "",
  Coordinator: "",
  IsQuickAdmit: "",
  SectionNumber: "",
  SectionFacultyFirstName: "",
  SectionFacultyLastName: "",
  FromStartDate: "",
  ToStartDate: "",
  ToCreationDate: "",
  FromCreationDate: "",
  ToTerminationDate: "",
  FromTerminationDate: "",
  MeetsOn: "",
  MeetingType: "",
  SectionStatusCodeID: "",
  OrganizationID: "",
  ComboSearchTagHierarchy: "",
  ComboSearchTagTypeIDHierarchy: "",
  TagName: "",
  TagTypeID: "",
  SiteID: "",
  BuildingID: "",
  RoomID: ""
}

export function useSectionFilterState(state = INITIAL_SECTION_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<ISectionFilterValues>(state)
  return { filterData, updateFilterData }
}
