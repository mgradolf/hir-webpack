import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { QuestionRepositorySearchMeta } from "~/TableSearchMeta/QuestionRepository/QuestionRepositorySearchMeta"
import { getQuestionRepositoryTableColumn } from "~/TableSearchMeta/QuestionRepository/QuestionRepositoryTableColumn"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function QuestionsLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Question"
      displayField="Name"
      meta={QuestionRepositorySearchMeta as IField[]}
      {...props}
      {...getQuestionRepositoryTableColumn(true)}
      valueField={"PreferenceDefID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Question", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
