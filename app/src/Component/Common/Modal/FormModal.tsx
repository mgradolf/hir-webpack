import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"

export const FormModal = (props: {
  title: string
  meta: IFilterField[]
  initialFilter?: { [key: string]: any }
  defaultFilter?: { [key: string]: any }
  formSubmitApi: (Params: any) => Promise<IApiResponse>
  closeModal: () => void
}) => {
  return (
    <Modal width="1000px" zIndex={zIndex.defaultModal}>
      <SearchFilters
        title={""}
        isModalView={true}
        isCheckeble={false}
        visible={true}
        meta={props.meta}
        applyButtonLabel="Submit"
        initialFilter={props.initialFilter}
        onApplyChanges={(newFilterValues, appliedFilterCount) => {
          props.formSubmitApi({ ...newFilterValues, ...props.defaultFilter }).then((x) => {
            if (x.success) {
              props.closeModal()
            }
          })
        }}
      />
    </Modal>
  )
}
