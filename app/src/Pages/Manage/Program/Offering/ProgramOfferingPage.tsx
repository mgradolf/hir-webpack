import React, { useState } from "react"
import { Redirect } from "react-router"
import { createOrUpdateProgramOffering } from "~/ApiServices/Service/ProgramService"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramOfferingFormMeta } from "~/Component/Feature/ProgramOffering/FormMeta/ProgramOfferingFormMeta"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"
import { REFRESH_PAGE } from "~/utils/EventBus"

export default function () {
  const [newlyCreatedProgramOfferingID, setNewlyCreatedProgramOfferingID] = useState<number>()
  return (
    <>
      {newlyCreatedProgramOfferingID && <Redirect to={`/program/offering/${newlyCreatedProgramOfferingID}`} />}
      <SearchPage
        blocks={[
          <MetaDrivenFormModalOpenButton
            buttonLabel="Create Program Offering"
            iconType="create"
            formTitle="Create Program Offering"
            helpkey="programsCreateProgramOffering"
            formMeta={ProgramOfferingFormMeta}
            formSubmitApi={(Params: { [key: string]: any }) =>
              createOrUpdateProgramOffering(Params).then((x) => {
                if (x.success) setNewlyCreatedProgramOfferingID(x.data.ProgramOfferingID)
                return x
              })
            }
            initialFormValue={{}}
            defaultFormValue={{}}
            refreshEventName={REFRESH_PAGE}
          />
        ]}
        title="Manage Program Offerings"
        meta={ProgramOfferingSearchMeta}
        metaName="ProgramOfferingSearchMeta"
        hideSearchField={false}
        tableProps={{
          ...getProgramOfferingTableColumns()
        }}
        helpKey="programsSearchOffering"
      />
    </>
  )
}
