import { useState, useEffect } from "react"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { eventBus, REFRESH_OFFERING_PAGE } from "~/utils/EventBus"
import { IFilterValues } from "~/Component/SearchFilters"

export function useOfferings(filterData: IFilterValues): [boolean, any[]] {
  const [offeringItems, setOfferingItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadOfferings = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["OfferingCode"] = filterData.OfferingCode !== "" ? filterData.OfferingCode : "*"
      params["OfferingName"] = filterData.OfferingName !== "" ? filterData.OfferingName : undefined
      params["ToCreationDate"] = filterData.ToCreationDate !== "" ? filterData.ToCreationDate : undefined
      params["FromCreationDate"] = filterData.FromCreationDate !== "" ? filterData.FromCreationDate : undefined
      params["ToTerminationDate"] = filterData.ToTerminationDate !== "" ? filterData.ToTerminationDate : undefined
      params["FromTerminationDate"] = filterData.FromTerminationDate !== "" ? filterData.FromTerminationDate : undefined
      params["StatusID"] = filterData.StatusID !== "" ? Number(filterData.StatusID) : undefined
      params["Coordinator"] = filterData.Coordinator !== "" ? filterData.Coordinator : undefined
      params["OrganizationID"] = filterData.OrganizationID !== "" ? Number(filterData.OrganizationID) : undefined
      params["OfferingTypeID"] = filterData.OfferingTypeID !== "" ? Number(filterData.OfferingTypeID) : undefined
      params["SectionTypeID"] = filterData.SectionTypeID !== "" ? Number(filterData.SectionTypeID) : undefined
      params["InstructorID"] = filterData.InstructorID !== "" ? Number(filterData.InstructorID) : undefined
      params["ShowProgramOffering"] = filterData.ShowProgramOffering !== "" ? filterData.ShowProgramOffering : undefined
      params["OfferingNearCapacity"] =
        filterData.OfferingNearCapacity !== "" ? filterData.OfferingNearCapacity : undefined
      // eslint-disable-next-line no-eval
      params["IsQuickAdmit"] = filterData.IsQuickAdmit !== "" ? eval(filterData.IsQuickAdmit) : undefined
      params["IsSearchTagHierarchy"] =
        // eslint-disable-next-line no-eval
        filterData.IsSearchTagHierarchy !== "" ? eval(filterData.IsSearchTagHierarchy) : undefined
      params["TagName"] = filterData.TagName !== "" ? filterData.TagName : undefined
      params["TagTypeID"] = filterData.TagTypeID !== "" ? filterData.TagTypeID : undefined
      params["ToFinalEnrollmentDate"] =
        filterData.ToFinalEnrollmentDate !== "" ? filterData.ToFinalEnrollmentDate : undefined
      params["FromFinalEnrollmentDate"] =
        filterData.FromFinalEnrollmentDate !== "" ? filterData.FromFinalEnrollmentDate : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (params[key] === undefined) {
          delete params[key]
        }
      })

      const result = await searchOffering(params)

      if (result && result.success) {
        setOfferingItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_OFFERING_PAGE, loadOfferings)
    eventBus.publish(REFRESH_OFFERING_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_PAGE)
    }
  }, [filterData])

  return [loading, offeringItems]
}

const INITIAL_OFFERING_FILTER_DATA: IFilterValues = {
  OfferingCode: "",
  OfferingName: "",
  ToCreationDate: "",
  FromCreationDate: "",
  ToTerminationDate: "",
  FromTerminationDate: "",
  IsQuickAdmit: "",
  StatusID: "",
  Coordinator: "",
  OrganizationID: "",
  OfferingTypeID: "",
  SectionTypeID: "",
  InstructorID: "",
  ShowProgramOffering: "",
  TagName: "",
  TagTypeID: "",
  IsSearchTagHierarchy: "",
  OfferingNearCapacity: "",
  ToFinalEnrollmentDate: "",
  FromFinalEnrollmentDate: ""
}

export function useOfferingFilterState(state = INITIAL_OFFERING_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IFilterValues>(state)
  return { filterData, updateFilterData }
}
