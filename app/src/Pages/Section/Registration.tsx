import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import SectionRegistrationTable from "~/Component/Section/SectionRegistrationTable"

export default function RegistrationPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [registrations, setRegistrations] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    findRegistrations({ SectionID }).then((x) => {
      if (x.success) {
        setRegistrations(x.data)
      }
      setLoading(false)
    })
  }, [SectionID])
  return <SectionRegistrationTable dataSource={registrations} loading={loading} />
}
