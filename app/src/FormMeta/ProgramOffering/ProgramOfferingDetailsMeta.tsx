import { CardContainer } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"

export const getProgramOfferingDetailsMeta = (program: { [key: string]: any }): CardContainer[] => {
  const info: CardContainer = {
    title: `Program Code - ${program.ProgramOfferingCode}`,
    contents: [
      { label: "Name", value: program.Name },
      { label: "Description", value: program.Description },
      { label: "Status", value: program.ProgramStatusName },
      { label: "Department", value: program.OrganizationName },
      { label: "Program Offering Status", value: program.ProgramOfferingStatusCodeName }
    ]
  }

  return [info]
}
