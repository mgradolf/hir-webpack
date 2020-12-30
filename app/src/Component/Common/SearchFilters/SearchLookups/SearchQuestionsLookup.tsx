import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { QuestionSearchMeta } from "~/FormMeta/Question/QuestionSearchMeta"
import { getQuestionTableColumn } from "~/FormMeta/Question/QuestionTableColumn"

interface ISearchLookupOpenButton extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchQuestionLookup(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Question"
      displayField="Name"
      meta={QuestionSearchMeta}
      {...props}
      {...getQuestionTableColumn(true)}
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
