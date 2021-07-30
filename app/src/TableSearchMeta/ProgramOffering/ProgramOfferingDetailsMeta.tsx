import React from "react"
import { deleteProgramOfferingWithEvent } from "~/ApiServices/BizApi/program/programIF"
import { createOrUpdateProgramOffering } from "~/ApiServices/Service/ProgramService"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { ProgramFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramForm"
import { ProgramOfferingFormMeta } from "~/Component/Feature/ProgramOffering/FormMeta/ProgramOfferingFormMeta"
import { REFRESH_PAGE } from "~/utils/EventBus"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export const getProgramOfferingDetailsMeta = (program: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const info: CardContainer = {
    cardActions: [
      <MetaDrivenFormModalOpenButton
        buttonLabel="Edit Program Offering"
        iconType="edit"
        formTitle="Edit Program Offering"
        formMeta={ProgramOfferingFormMeta}
        formSubmitApi={createOrUpdateProgramOffering}
        initialFormValue={{
          ProgramOfferingCode: program.OfferingCode,
          Name: program.Name,
          Description: program.Description,
          ProgramOfferingStatusCodeID: program.OfferingStatusCodeID,
          OrganizationID: program.OrganizationID,
          PaymentGatewayAccountID: program.PaymentGatewayAccountID
        }}
        defaultFormValue={{ ProgramOfferingID: program.OfferingID }}
        isHorizontal={true}
        refreshEventName={REFRESH_PAGE}
        helpkey="programsEditProgramOffering"
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
      // { label: "Status", value: program.OfferingStatusCodeName },
      // { label: "Department", value: program.OrganizationName }
    ]
  }
  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      blocks: [<HelpButton helpKey="programsProgramOfferingSummaryTab" />],
      summary: [info]
    }
  })

  meta.push({
    tabTitle: "Programs",
    tabType: "table",
    tabMeta: {
      blocks: [
        <ProgramFormOpenButton iconType="create" editMode={false} ProgramOfferingID={program.OfferingID} />,
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
