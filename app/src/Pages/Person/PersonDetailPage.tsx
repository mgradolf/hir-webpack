import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Col, Row, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"
import { NameAddressInfo } from "~/Component/Person/Details/NameAddressInfo"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { PersonalInfo } from "~/Component/Person/Details/PersonalInfo"
import { LoginInfo } from "~/Component/Person/Details/LoginInfo"

export default function PersonDetailsPage(
  props: RouteComponentProps<{ personID?: string; facultyID?: string; studentID?: string }>
) {
  const PersonID = Number(props?.match?.params?.personID)
  const FacultyID = Number(props?.match?.params?.facultyID)
  const StudentID = Number(props?.match?.params?.studentID)

  const [person, setPerson] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IProcessedApiError>()

  const loadPersonDetails = () => {
    console.log(props.match.params)
    setLoading(true)
    let Param: { [key: string]: any }
    if (StudentID) Param = { StudentID: StudentID }
    else if (FacultyID) Param = { FacultyID: FacultyID }
    else Param = { PersonID: PersonID }

    getPersonDetails(Param).then((x) => {
      setLoading(false)
      if (x.success) setPerson(x.data[0])
      else setError(x.error)
    })
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadPersonDetails)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [PersonID, FacultyID, StudentID])

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
        <Col xs={24} sm={24} md={12}>
          <PersonalInfo person={person} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <NameAddressInfo person={person} />
        </Col>
        {person.Login && (
          <Col xs={24} sm={24} md={12}>
            <LoginInfo login={person.Login} />
          </Col>
        )}
      </Row>
    </div>
  )
}
