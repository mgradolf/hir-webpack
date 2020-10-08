import { useState, useEffect } from "react"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"
import { eventBus, REFRESH_SECTION_REQUEST_PAGE } from "~/utils/EventBus"
import { RecordType } from "~/Component/Common/ResponsiveTable"

interface ISectionFilterValues extends RecordType {
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

export function useRequests(
  sectionID: number | undefined = undefined
): [boolean, any[]] {
  const [requestItems, setRequestItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadRequests = async function () {
      setLoading(true)
      const result = await getLiteRequests({ ProductID: sectionID, ProductType: "SectionID" })

      if (result && result.success) {
        setRequestItems(result.data.Requests)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_SECTION_REQUEST_PAGE, loadRequests)
    eventBus.publish(REFRESH_SECTION_REQUEST_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_REQUEST_PAGE)
    }
  }, [sectionID])

  return [loading, requestItems]
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
