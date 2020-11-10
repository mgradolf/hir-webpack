export interface IRegistrationFieldNames {
  SectionID: any
  StudentID: any
  SeatGroupID: any
  IsRepeat: any
  IsCompleteOnTermination: any
  StatusDate: any
  CreationTime: any
  TerminationTime: any
  TranscriptCreditTypeID: any
  AttendanceExpected: any
  GradeScaleTypeID: any
}

export interface IRegistrationActionFieldNames {
  SectionID: any
  StudentID: any
  SeatGroupID: any
  EffectiveDate: any
  GradeScoreDefinitionID: any
  IsRefund: any
  CreditMemoData: any
  GradeScaleTypeID: any
}

export interface IEmailSendFieldNames {
  ToEmailAddress: any
  FromEmailAddress: any
  Subject: any
  Message: any
  MimeType: any
}
