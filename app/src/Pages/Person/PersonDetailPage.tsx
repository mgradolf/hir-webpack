import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Col, Row, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useLocation } from "react-router-dom"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"
import { NameAddressInfo } from "~/Component/Person/Details/NameAddressInfo"
// import { PersonalInfo } from "~/Component/Person/Details/PersonalInfo"
// import { ReferenceInfo } from "~/Component/Person/Details/ReferenceInfo"
// import { UpdateInfo } from "~/Component/Person/Details/UpdateInfo"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function PersonDetailsPage(props: RouteComponentProps<{ personID: string }>) {
  const PersonID = Number(props?.match?.params?.personID)
  const idType = useQuery().get("type")

  const [person, setPerson] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IProcessedApiError>()
  useEffect(() => {
    setLoading(true)
    let Param: { [key: string]: any }
    switch (idType) {
      case "Student":
        Param = { StudentID: PersonID }
        break
      case "Faculty":
        Param = { FacultyID: PersonID }
        break
      default:
        Param = { PersonID: PersonID }
        break
    }

    getPersonDetails(Param).then((x) => {
      setLoading(false)
      if (x.success) setPerson(x.data[0])
      else setError(x.error)
    })
  }, [PersonID, idType])

  if (loading)
    return (
      <Row justify="center" align="middle">
        <Spin size="large" />
      </Row>
    )
  if (error) return <p>Couldn't found any person with person id {PersonID}</p>
  return (
    <div className="site-layout-content">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <NameAddressInfo person={person} />
        </Col>
        {/* <Col xs={24} sm={24} md={12}>
          <PersonalInfo person={person} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <ReferenceInfo person={person} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <UpdateInfo person={person} />
        </Col> */}
      </Row>
    </div>
  )
}
