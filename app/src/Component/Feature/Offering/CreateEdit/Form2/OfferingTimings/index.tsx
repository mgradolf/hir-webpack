import React, { useState, useEffect } from "react"
import { Divider } from "antd"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { getTerms } from "~/ApiServices/Service/RefLookupService"
import DefineCreationTime from "~/Component/Feature/Offering/CreateEdit/Form2/OfferingTimings/DefineCreationTime"
import DefineTerminationTime from "~/Component/Feature/Offering/CreateEdit/Form2/OfferingTimings/DefineTerminationTime"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

export default function OfferingTimings(props: IOfferingTimings) {
  const [terms, setterms] = useState([])
  useEffect(() => {
    const loadTerms = async () => {
      const response = await getTerms()
      if (response) setterms(response.data)
    }
    loadTerms()
  }, [])
  return (
    <>
      <Divider />
      <DefineCreationTime {...props} terms={terms} />
      <Divider />
      <DefineTerminationTime {...props} terms={terms} />
    </>
  )
}
