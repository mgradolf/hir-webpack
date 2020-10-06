export interface ISectionSeatGroupFieldNames {
  Name: any
  NumberOfSeats: any
  EstimatedEnrollment: any
  DueDatePolicyID: any
  WaitListEnabled: any
  SeatGroupID: any
  SectionID: any
  ProgramID: "ProgramID"
  ProgramCode: "ProgramCode"
}

export interface IScheduleFieldNames {
  SectionID: any
  MeetingTypeID: any
  StartTime: any
  EndTime: any
  MeetingDate: any
  Occurrences: any
  Mon: any
  Tue: any
  Wed: any
  Thu: any
  Fri: any
  Sat: any
  Sun: any
  Frequency: any
  ExcludeHoliday: any
}

export interface IScheduleLocationFieldNames {
  ScheduleIDs: any
  SiteID: any
  BuildingID: any
  RoomID: any
  ConflictCheck: any
}

export interface IBudgetFieldNames {
  SectionID: string
  FinancialID: string
  Description: string
  GLAccountID: string
  ItemUnitAmount: string
  InitialDepositAmount: string
  IsOptional: string
  ItemQty: string
  SeatGroupIDs: string
  FinancialBasisType: string
  FinancialType: string
}

export interface IDiscountFieldNames {
  SectionID: string
  SectionFinancialID: string
  DiscountProgramID: string
  DiscountTypeID: string
  DiscountType: string
  Amount: string
  ShortName: string
  Name: string
  AmountTypeID: string
  IsPromotedForMarketing: string
  GLAccountID: string
  IsActive: string
  DiscountVolume: string
  DiscountVolumeMultiply: string
  ToAge: string
  FromAge: string
  ToDate: string
  FromDate: string
  promoCode: string
}
