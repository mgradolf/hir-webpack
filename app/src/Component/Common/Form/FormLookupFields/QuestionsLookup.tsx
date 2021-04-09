import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { QuestionRepositorySearchMeta } from "~/TableSearchMeta/QuestionRepository/QuestionRepositorySearchMeta"
import { getQuestionRepositoryTableColumn } from "~/TableSearchMeta/QuestionRepository/QuestionRepositoryTableColumn"

export function QuestionsLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Question"
      displayKey="Name"
      meta={QuestionRepositorySearchMeta as IField[]}
      metaName="QuestionRepositorySearchMeta"
      placeholder="Search By Question"
      {...props}
      {...getQuestionRepositoryTableColumn(true)}
      valueKey={"PreferenceDefID"}
    />
  )
}
