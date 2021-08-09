import React from "react"
import { deleteProgramOfferingWithEvent } from "~/ApiServices/BizApi/program/programIF"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { ProgramFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramForm"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { ProgramOfferingFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramOfferingForm"

export const getProgramOfferingDetailsMeta = (program: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const info: CardContainer = {
    cardActions: [
      <ProgramOfferingFormOpenButton
        editMode={true}
        iconType={"edit"}
        initialValues={{
          ProgramOfferingID: program.OfferingID
        }}
      />,
      <IconButton
        toolTip="Delete Program Offering"
        iconType="remove"
        redirectTo="/program/offering"
        onClickRemove={() => deleteProgramOfferingWithEvent({ ProgramOfferingID: program.OfferingID })}
      />
    ],
    contents: [
      { label: "Name", value: program.Name },
      { label: "Description", value: program.Description }
    ]
  }
  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<HelpButton helpKey="programsProgramOfferingSummaryTab" />],
      summary: [info]
    }
  })

  meta.push({
    tabTitle: "Programs",
    tabType: "table",
    tabMeta: {
      blocks: [
        <ProgramFormOpenButton
          helpKey="programOfferingProgramsAddNewProgram"
          iconType="create"
          editMode={false}
          ProgramOfferingID={program.OfferingID}
        />,
        <HelpButton helpKey="programOfferingProgramsTab" />
      ],
      tableProps: {
        pagination: false,
        ...getProgramTableColumns(),
        searchParams: { OfferingID: program.OfferingID },
        refreshEventName: "REFRESH_PROGRAMS_TAB"
      }
    }
  })

  return {
    pageTitle: `Program Code - ${program.OfferingCode}`,
    tabs: meta
  }
}
