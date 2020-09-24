import { useEffect, useState } from "react"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"

interface IProgramFilterValues {
  programCode: string
  departmentID: number | string
  name: string
  programStatusCodeID: number | string
  programOfferingName: string
  programOfferingCode: string
}

const INITIAL_FILTER_VALUES: IProgramFilterValues = {
  programCode: "*",
  departmentID: "",
  name: "*",
  programStatusCodeID: "",
  programOfferingName: "*",
  programOfferingCode: "*"
}

export function useSearchFilterState() {
  const [filterData, updateFilterData] = useState<IProgramFilterValues>(INITIAL_FILTER_VALUES)
  return { filterData, updateFilterData }
}

export function useSearchProgram(filterData: IProgramFilterValues): [boolean, any[]] {
  const [programItems, setProgramItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadPrograms = async function () {
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
      const result = await searchPrograms([params])

      if (result && result.success) {
        setProgramItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_SECTION_SEATGROUP_PAGE, loadPrograms)
    eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_SEATGROUP_PAGE)
    }
  }, [filterData])

  return [loading, programItems]
}
