import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { QuestionRepositorySearchMeta } from "~/FormMeta/QuestionRepository/QuestionRepositorySearchMeta"
import { getQuestionRepositoryTableColumn } from "~/FormMeta/QuestionRepository/QuestionRepositoryTableColumn"

interface ISearchLookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function SearchQuestionLookup(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
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
