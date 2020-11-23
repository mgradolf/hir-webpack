import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

export const getPersonDetailsMeta = (person: { [key: string]: any }): CardContainer[] => {
  const personalInfo: CardContainer = {
    title: person.FormattedName,
    contents: [
      { label: "First Name", value: person.FirstName, render: undefined },
      { label: "Middle Name", value: person.MiddleName, render: undefined },
      { label: "Last Name", value: person.LastName, render: undefined },
      { label: "Maiden Name", value: person.MaidenName, render: undefined },
      { label: "OtherName", value: person.OtherName, render: undefined },
      { label: "Birthday", value: person.Birthday, render: renderDate },
      { label: "Gender", value: person.GenderTypeName, render: undefined },
      { label: "Marital Status ", value: person.MaritalStatusTypeName, render: undefined },
      { label: "Private ", value: person.IsConfidential, render: renderBoolean },
      { label: "Religion", value: person.ReligionTypeName, render: undefined },
      { label: "Deceased", value: person.IsDeceased, render: renderBoolean },
      { label: "DeathDate", value: person.DeathDate, render: renderDate },
      { label: "Citizenship Type", value: person.CitizenshipTypeName, render: undefined },
      { label: "Can Defer Payment", value: person.CanDeferPayment, render: undefined },
      { label: "SSN", value: person.GovID, render: undefined },
      { label: "ERPID", value: person.ERPID, render: undefined }
    ]
  }
  const address: CardContainer = {
    title: "Address",
    contents: Array.isArray(person.Addresses)
      ? person.Addresses.map((x: any) => {
          return {
            label: x.AddressTypeDescriptor,
            jsx: (
              <div>
                {x.AddressLine1 && <span>{x.AddressLine1}</span>}
                {x.AddressLine2 && <span>, {x.AddressLine2}</span>}
                {x.AddressLine3 && <span>, {x.AddressLine3}</span>}
                <br />
                <span>
                  {x.Locality} {x.CountryDescriptor}
                </span>
              </div>
            )
          }
        })
      : []
  }

  const phone: CardContainer = {
    title: "Telephone",
    contents: Array.isArray(person.Telephones)
      ? person.Telephones.map((x: any) => {
          return {
            label: x.TelephoneTypeDescriptor,
            jsx: x.TelephoneNumber
          }
        })
      : []
  }
  const email: CardContainer = {
    title: "Email",
    contents: Array.isArray(person.Emails)
      ? person.Emails.map((x: any) => {
          return {
            label: x.EmailTypeDescriptor,
            jsx: x.EmailAddress
          }
        })
      : []
  }

  const login: CardContainer = {
    title: "Web Login",
    contents: [
      { label: "User Login", value: person?.login?.UserLogin },
      { label: "Secret Question", value: person?.login?.SecretQuestion },
      { label: "Secret Answer", value: person?.login?.SecretAnswer }
    ]
  }

  return [personalInfo, { groupedContents: [address, email, phone] }, login]
}
