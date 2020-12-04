import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

export const getPersonDetailsMeta = (personInfos: { [key: string]: any }[]): CardContainer[] => {
  const person: { [key: string]: any } = personInfos[0]
  const instructor: { [key: string]: any } | undefined = personInfos[1].Faculty
  const student: { [key: string]: any } | undefined = personInfos[1].Student
  const disabilities: { [key: string]: any } | undefined = personInfos[1].PersonDisabilites
  console.log("student ", student, personInfos)

  const personalInfo: CardContainer = {
    title: person.FormattedName,
    contents: [
      { label: "Prefix", value: person.Prefix, render: undefined },
      { label: "First Name", value: person.FirstName, render: undefined },
      { label: "Middle Name", value: person.MiddleName, render: undefined },
      { label: "Last Name", value: person.LastName, render: undefined },
      { label: "Suffix", value: person.Suffix, render: undefined },
      { label: "Maiden Name", value: person.MaidenName, render: undefined },
      { label: "Other Name", value: person.OtherName, render: undefined },
      { label: "Title", value: person.Title, render: undefined },

      { label: "SSN", value: person.GovID, render: undefined },
      { label: "ERP ID", value: person.ERPID, render: undefined },
      { label: "Date of Birth", value: person.Birthday, render: renderDate },
      { label: "Gender", value: person.GenderTypeName, render: undefined },
      { label: "Marital Status", value: person.MaritalStatusTypeName, render: undefined },
      { label: "Deceased", value: person.IsDeceased, render: renderBoolean },
      { label: "Date of Death", value: person.DeathDate, render: renderDate },
      { label: "Citizenship", value: person.CitizenshipTypeName, render: undefined },
      { label: "Religion", value: person.ReligionTypeName, render: undefined },
      {
        label: "Ethnicity",
        value:
          Array.isArray(person.Ethnicity) && person.Ethnicity.map((x: any) => x.EthnicityTypeDescriptor).toString(),
        render: undefined
      },
      {
        label: "Disability",
        value: Array.isArray(disabilities) && disabilities.map((x: any) => x.DisabilityTypeName).toString(),
        render: undefined
      },
      { label: "Can Defer Payment", value: person.CanDeferPayment, render: undefined },
      { label: "Personal Information is Private ", value: person.IsConfidential, render: renderBoolean }
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
      { label: "User Login", value: person?.Login?.UserLogin },
      { label: "Secret Question", value: person?.Login?.SecretQuestion },
      { label: "Secret Answer", value: person?.Login?.SecretAnswer }
    ]
  }

  const studentInfo: CardContainer | undefined = student
    ? {
        title: "Student Info",
        contents: [
          { label: "Organization", value: student?.Organization },
          { label: "Start Date", value: student?.StartDate, render: renderDate },
          { label: "End Date", value: student?.EndDate, render: renderDate },
          { label: "Academic Standing", value: student?.AcademicStandingTypeName },
          { label: "Status", value: student?.StudentStatusCodeName },
          { label: "Commuter", value: student?.IsCommuter, render: renderBoolean },
          { label: "Solicit For Marketing", value: student?.AllowMarketing, render: renderBoolean },
          { label: "Family Educational Rights and Privacy Act (FERPA)", value: student?.FERPA, render: renderBoolean }
        ]
      }
    : undefined

  const instructorInfo: CardContainer | undefined = instructor
    ? {
        title: "Instructor Info",
        contents: [
          { label: "Organization", value: instructor?.OrganizationName },
          { label: "Status", value: instructor?.InstitutionStatusCodeName },
          { label: "Type", value: instructor?.InstructorTypeName },
          { label: "Active", value: instructor?.IsActive, render: renderBoolean },
          { label: "Serial Num", value: instructor?.FacultySerialNum }
        ]
      }
    : undefined

  const meta: any[] = []
  meta.push(personalInfo)
  meta.push({ groupedContents: [address, email, phone, login] })
  instructorInfo && meta.push(instructorInfo)
  studentInfo && meta.push(studentInfo)
  return meta
}
