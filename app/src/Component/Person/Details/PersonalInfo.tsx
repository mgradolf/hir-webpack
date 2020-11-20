import { Card } from "antd"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { DATE_FORMAT } from "~/utils/Constants"

export function PersonalInfo({ person }: { person: { [key: string]: any } }) {
  const [state, setState] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    let infos: { [key: string]: any } = {}
    // infos = { ...infos, Name: person.FormattedName }
    infos = { ...infos, "First Name": person.FirstName }
    infos = { ...infos, "Middle Name": person.MiddleName }
    infos = { ...infos, "Last Name": person.LastName }
    infos = { ...infos, "Maiden Name": person.MaidenName }
    infos = { ...infos, OtherName: person.OtherName }
    infos = person.Birthday ? { ...infos, Birthday: moment(person.Birthday).format(DATE_FORMAT) } : infos
    infos = { ...infos, Gender: person.GenderTypeName }
    infos = { ...infos, "Marital Status ": person.MaritalStatusTypeName }
    infos = { ...infos, "Private ": person.IsConfidential ? "Yes" : "No" }
    infos = { ...infos, Religion: person.ReligionTypeName }
    infos = { ...infos, Deceased: person.IsDeceased ? "Yes" : "No" }
    infos =
      person.IsDeceased && person.DeathDate
        ? { ...infos, "Death Date": moment(person.DeathDate).format(DATE_FORMAT) }
        : infos
    infos = {
      ...infos,
      Ethnicity: Array.isArray(person.Ethnicity) && person.Ethnicity.map((x) => x.EthnicityTypeDescriptor).toString()
    }
    infos = { ...infos, "Citizenship Type": person.CitizenshipTypeName }

    infos = { ...infos, "Can Defer Payment": person.CanDeferPayment ? "Yes" : "No" }
    infos = { ...infos, SSN: person.GovID }
    infos = { ...infos, ERPID: person.ERPID }
    setState(infos)
  }, [person])
  return (
    <Card title={person.FormattedName}>
      <table style={{ width: "400px" }}>
        <tbody>
          {Object.keys(state).map((key, i) => (
            <tr>
              <td>{key}</td>
              <td>{state[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
