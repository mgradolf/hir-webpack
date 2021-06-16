import { IItemRequest, IMembershipRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const fakeCartData: IItemRequest[] = [
  {
    RequestID: 606483311526822030,
    ItemType: "RegistrationRequest",
    ItemRequestType: "RegistrationRequest",
    PaymentAmount: 1000.0,
    PaymentGatewayAccountID: 9,
    TranscriptCreditTypeID: 2002,
    ItemTypeID: 1,
    RecipientPersonID: 14889,
    UnitPrice: 1000.0,
    StatusDate: "2021-06-09T12:02:54+06:00",
    GradeScaleTypeID: 2044,
    ItemQuantity: 1,
    ItemName: "SMT.(3) SMT Offering",
    AccessContext: null,
    AnswerMap: null,
    AttendanceExpected: null,
    SectionID: 10852,
    SeatGroupID: 11562,
    OfferingID: 6824,
    RecipientPersonName: "0507, nargis",
    SeatGroups: [
      {
        IsDefault: false,
        AccountID: 4813,
        ReservedSeats: 0,
        TotalSeats: 10,
        SectionID: 8885,
        SeatGroupID: 11933,
        SeatGroupName: "aarosh",
        AvailableSeats: 10
      },
      {
        IsDefault: true,
        AccountID: null,
        ReservedSeats: 122,
        TotalSeats: 123,
        SectionID: 8885,
        SeatGroupID: 9178,
        SeatGroupName: "Default seat group",
        AvailableSeats: 1
      },
      {
        IsDefault: false,
        AccountID: null,
        ReservedSeats: 2,
        TotalSeats: 500,
        SectionID: 8885,
        SeatGroupID: 9638,
        SeatGroupName: "j2ee",
        AvailableSeats: 498
      }
    ],
    issues: {
      RegistrationCheck_passed: false,
      DuplicateRequestCheck_passed: false,
      SectionValidityCheck_passed: false,

      // RegistrationCheck_passed: true,
      // DuplicateRequestCheck_passed: true,
      // SectionValidityCheck_passed: true,
      check_sectionvalidity_issues: [],
      check_prerequisiteconflict_conflicts: [
        {
          Status: "NOT-TAKEN",
          SectionNumber: null,
          CreditHours: null,
          StatusID: null,
          OfferingCode: "COMP-101",
          Grade: null,
          OfferingName: "Java Programming I",
          SectionID: null,
          OfferingID: 5576
        }
      ],
      RegistrationQuestionCheck_passed: false,
      ScheduleConflict_passed: false,
      StudentOnHoldCheck_passed: false,
      PrerequisiteCheck_passed: false,
      check_scheduleconflict_conflicts: [
        { SectionNumber: "COMP-201.(1)" },
        { SectionNumber: "SMT1" },
        { SectionNumber: "SMT1" },
        { SectionNumber: "SMT1" },
        { SectionNumber: "SMT1" },
        { SectionNumber: "SMT1" },
        { SectionNumber: "SMT1" }
      ]
    },
    OverrideData: {
      SectionPrerequisiteCheck: false,
      StudentOnHoldCheckWithMessage: false,
      StudentOnHoldCheck: false,
      ScheduleConflictCheck: false,
      AnswerQuestion: false
    }
  } as IItemRequest,
  {
    RequestID: 5065553080567287080,
    ItemType: "ProgramApplicationRequest",
    ItemRequestType: "ProgramApplicationRequest",
    PaymentAmount: 0.0,
    PaymentGatewayAccountID: 2,
    TranscriptCreditTypeID: 0,
    ProgramID: 1002,
    ItemTypeID: 1,
    RecipientPersonID: 14889,
    UnitPrice: 0,
    StatusDate: "2021-06-11T18:13:43+06:00",
    GradeScaleTypeID: 2,
    ItemQuantity: 1,
    ItemName: "CX Release I System Administrator Application",
    AccessContext: null,
    AnswerMap: null,
    AttendanceExpected: null,
    SectionID: 5168,
    SeatGroupID: 5248,
    OfferingID: 2097,
    RecipientPersonName: "0507, nargis",
    issues: {
      program_validity_issues: [],
      // eslint-disable-next-line
      ["Request.DuplicateRequestCheck_passed"]: false,
      check_application_passed: false,
      program_validity_passed: false
    }
  } as IItemRequest,
  {
    RequestID: 8979652293605344847,
    MembershipProgramName: "sprint 1",
    ItemType: "MembershipRequest",
    ItemRequestType: "MembershipRequest",
    ProductID: 11,
    PaymentAmount: 20.0,
    PaymentGatewayAccountID: 8,
    ItemTypeID: 2,
    RecipientPersonID: 14889,
    UnitPrice: 20,
    MembershipDefinitionID: 12,
    ItemQuantity: 1,
    MembershipDefinitionName: "level1",
    MktExpirationDate: null,
    ItemName: "Shot glasses",
    IsOptionalProduct: false,
    MemberSince: null,
    AccessContext: null,
    AnswerMap: null,
    RecipientPersonName: "0507, nargis",
    issues: {
      FixedTermMembershipAlreadyBought_passed: false,
      FixterTermMembershipExpired_passed: false,
      DuplicateRequestCheck_passed: false,
      MembershipCannotBeRenewed_passed: false,
      MembershipAlreadyBoughtAndRenewed_passed: false
    }
  } as IMembershipRequest
]
