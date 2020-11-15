import { IProcessedApiError } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Card, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useLocation } from "react-router-dom"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"

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
      if (x.success) setPerson(x.data)
      else setError(x.error)
    })
  }, [PersonID, idType])

  if (loading) return <Spin spinning={true} size="large" />
  if (error) return <p>Couldn't found any person with person id {PersonID}</p>
  return (
    <div className="site-layout-content">
      <Card title="Person Details">
        <table>
          <tbody>
            {Object.keys(person).map((key, index) => {
              if (!person[key]) return null
              return (
                <tr>
                  <td width={200}>{key}</td>
                  <td>{String(person[key])}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
