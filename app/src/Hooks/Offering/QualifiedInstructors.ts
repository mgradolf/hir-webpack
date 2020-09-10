import { useState, useEffect } from "react"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import { IFilterValues as IInstructorFilterValues } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn"

const INITIAL_INSTRUCTOR_FILTER_DATA: IInstructorFilterValues = {
  LastName: "",
  FirstName: "",
  FacultySerialNum: "",
  InstructorTypeID: ""
}

export function useInstructorFilterState(state = INITIAL_INSTRUCTOR_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IInstructorFilterValues>(state)
  return { filterData, updateFilterData }
}

export function useInstructors(filterData: IInstructorFilterValues): [boolean, any[]] {
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadInstructors = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["LastName"] = filterData.LastName !== "" ? filterData.LastName : "*"
      params["FIrstName"] = filterData.FirstName !== "" ? filterData.FirstName : undefined
      params["FacultySerialNum"] = filterData.FacultySerialNum !== "" ? filterData.FacultySerialNum : undefined
      params["InstructorTypeID"] = filterData.InstructorTypeID !== "" ? Number(filterData.InstructorTypeID) : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (!Boolean(params[key]) && typeof params[key] !== "number") {
          delete params[key]
        }
      })

      const result = await searchFaculties([params])

      if (result && result.success) {
        setInstructorItems(result.data)
      }
      setLoading(false)
    }
    loadInstructors()
  }, [filterData])

  return [loading, instructorItems]
}
