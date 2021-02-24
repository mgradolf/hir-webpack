import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"

export const getProgramOfferingDetailsMeta = (program: { [key: string]: any }): CardContainer[] => {
  const info: CardContainer = {
    title: `Program Code - ${program.ProgramOfferingCode}`,
    contents: [
      { label: "Name", value: program.Name },
      { label: "Description", value: program.Description },
      { label: "Status", value: program.ProgramOfferingStatusCodeName },
      { label: "Department", value: program.OrganizationName }
    ]
  }

  return [info]
}
