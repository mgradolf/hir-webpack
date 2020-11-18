import { useState, useEffect } from "react"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"
import { eventBus, REFRESH_SECTION_REQUEST_PAGE } from "~/utils/EventBus"

export interface IRequestFilterValues {
  SectionID: string
  RequestTypeID: string
  StateID: string
  sourceID: string
  AccountID: string
  PersonID: string
  PurchaserPersonID: string
  RecipientPersonID: string
  ReservationToken: string
  CreatedFromDate: string
  CreatedToDate: string
  RequesterStaffUserName: string
}

export function useRequests(filterData: IRequestFilterValues, SectionID?: number): [boolean, any[]] {
  const [requestItems, setRequestItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadRequests = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["ProductID"] = SectionID ? SectionID : undefined
      params["ProductType"] = SectionID ? "SectionID" : undefined
      params["RequestTypeID"] = filterData.RequestTypeID !== "" ? Number(filterData.RequestTypeID) : undefined
      params["StateID"] = filterData.StateID !== "" ? Number(filterData.StateID) : undefined
      params["sourceID"] = filterData.sourceID !== "" ? Number(filterData.sourceID) : undefined
      params["AccountID"] = filterData.AccountID !== "" ? Number(filterData.AccountID) : undefined
      params["PersonID"] = filterData.PersonID !== "" ? Number(filterData.PersonID) : undefined
      params["PurchaserPersonID"] =
        filterData.PurchaserPersonID !== "" ? Number(filterData.PurchaserPersonID) : undefined
      params["RecipientPersonID"] =
        filterData.RecipientPersonID !== "" ? Number(filterData.RecipientPersonID) : undefined
      params["ReservationToken"] = filterData.ReservationToken !== "" ? filterData.ReservationToken : undefined
      params["RequesterStaffUserName"] =
        filterData.RequesterStaffUserName !== "" ? filterData.RequesterStaffUserName : undefined
      params["CreatedFromDate"] = filterData.CreatedFromDate !== "" ? filterData.CreatedFromDate : undefined
      params["CreatedToDate"] = filterData.CreatedToDate !== "" ? filterData.CreatedToDate : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (params[key] === undefined) {
          delete params[key]
        }
      })

      const result = await getLiteRequests(params)
      if (result && result.success && result.data) {
        setRequestItems(result.data.Requests)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_SECTION_REQUEST_PAGE, loadRequests)
    eventBus.publish(REFRESH_SECTION_REQUEST_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_REQUEST_PAGE)
    }
  }, [filterData, SectionID])

  return [loading, requestItems]
}

const INITIAL_REQUEST_FILTER_DATA: IRequestFilterValues = {
  SectionID: "",
  RequestTypeID: "",
  StateID: "",
  sourceID: "",
  AccountID: "",
  PersonID: "",
  PurchaserPersonID: "",
  RecipientPersonID: "",
  CreatedFromDate: "",
  CreatedToDate: "",
  ReservationToken: "",
  RequesterStaffUserName: ""
}

export function useRequestFilterState(state = INITIAL_REQUEST_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IRequestFilterValues>(state)
  return { filterData, updateFilterData }
}
