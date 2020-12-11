import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export const getRegistrationDetailsMeta = (registration: { [key: string]: any }): CardContainer[] => {
  const info: CardContainer = {
    title: `Student ID - ${registration.StudentSerialNumber}`,
    contents: [
      // { label: "Student ID", value: registration.StudentSerialNumber },
      { label: "Student Name", value: registration.StudentName },
      { label: "Status", value: registration.TranscriptCreditType },
      { label: "Seat Group", value: registration.SeatGroup },
      { label: "Grade Scale", value: registration.GradeScaleType },
      { label: "Final Grade", value: registration.AlphaValue }
    ]
  }
  return [info]
}
