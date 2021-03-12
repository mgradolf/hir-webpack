import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage")) },
  { path: "/about", component: React.lazy(() => import("~/Pages/AboutPage")) },
  { path: "/admin", component: React.lazy(() => import("~/Pages/AdminPage")) },

  {
    path: "/offering",
    component: React.lazy(() =>
      import("~/Pages/Manage/Courses/Offering/index").then((x) => ({ default: x.OfferingPage }))
    )
  },
  { path: "/offering/:offeringID", component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Details")) },
  // {
  //   path: "/offering/:offeringID/financial",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Financial/FinancialPage"))
  // },
  // {
  //   path: "/offering/:offeringID/catalog",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Catalog"))
  // },
  // {
  //   path: "/offering/:offeringID/approval",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Approval"))
  // },
  // {
  //   path: "/offering/:offeringID/requisite",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Requisite"))
  // },
  // {
  //   path: "/offering/:offeringID/instructor",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/QualifiedInstructor/QualifiedInstructorPage"))
  // },
  // { path: "/offering/:offeringID/tag", component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/TagPage")) },
  // {
  //   path: "/offering/:offeringID/section",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Section"))
  // },
  // {
  //   path: "/offering/:offeringID/section/:sectionID",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Details"))
  // },

  { path: "/section", component: React.lazy(() => import("~/Pages/Manage/Courses/Section")) },
  { path: "/section/:sectionID", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Details")) },
  // {
  //   path: "/section/:sectionID/catalog",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Catalog"))
  // },
  // {
  //   path: "/section/:sectionID/seatgroup",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SeatGroup/SeatgroupPage"))
  // },
  // {
  //   path: "/section/:sectionID/schedule",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Schedule"))
  // },
  // {
  //   path: "/section/:sectionID/budget",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Budget/BudgetPage"))
  // },
  // {
  //   path: "/section/:sectionID/discount",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Discount/DiscountPage"))
  // },
  // {
  //   path: "/section/:sectionID/notification",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Notice/NoticePage"))
  // },
  // { path: "/section/:sectionID/tag", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/TagPage")) },
  {
    path: "/section/:sectionID/registration/:studentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Registration/Details"))
  },
  // {
  //   path: "/section/:sectionID/registration",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Registration"))
  // },
  // {
  //   path: "/section/:sectionID/order/payments/:paymentID",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/PaymentDetails"))
  // },
  // {
  //   path: "/section/:sectionID/order/payments",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/Payments"))
  // },
  // {
  //   path: "/section/:sectionID/order/items",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/OrderItems"))
  // },
  // {
  //   path: "/section/:sectionID/order/:orderID",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/OrderDetails"))
  // },
  // {
  //   path: "/section/:sectionID/order",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/Orders"))
  // },
  // {
  //   path: "/section/:sectionID/product",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Product/ProductPage"))
  // },
  // {
  //   path: "/section/:sectionID/waitlist",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/WaitlistEntries"))
  // },
  // {
  //   path: "/section/:sectionID/waitlist/:waitListEntryID",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryDetailsPage"))
  // },
  // {
  //   path: "/section/:sectionID/academic-log",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionAcademicLog"))
  // },
  // {
  //   path: "/section/:sectionID/enrollment-log",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionEnrollmentLog"))
  // },
  // {
  //   path: "/section/:sectionID/order-log",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionOrderLog"))
  // },
  // {
  //   path: "/section/:sectionID/comment",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Comment"))
  // },
  // { path: "/section/:sectionID/no-show", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/NoShow")) },
  // {
  //   path: "/section/:sectionID/request",
  //   component: React.lazy(() => import("~/Pages/Manage/Courses/Section/RequestPage"))
  // },
  // {
  //   path: "/section/:secitonID/request/:requestID",
  //   component: React.lazy(() => import("~/Pages/Manage/Request/RequestDetailsPage"))
  // },

  { path: "/order/items", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderItemPage")) },
  { path: "/order/credits", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderCreditsPage")) },
  { path: "/order/payments", component: React.lazy(() => import("~/Pages/Manage/Financials/PaymentPage")) },
  { path: "/order", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderPage")) },
  { path: "/order/:orderID", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderDetailsPage")) },
  {
    path: "/order/payments/:paymentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/PaymentDetails"))
  },

  {
    path: "/discount-program",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/DiscountProgram/DiscountProgramPage"))
  },
  {
    path: "/discount-program/:discountProgramID",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/DiscountProgram/DiscountProgramDetailsPage"))
  },

  { path: "/transaction", component: React.lazy(() => import("~/Pages/Manage/Financials/TransactionPage")) },
  {
    path: "/transaction/:depositID",
    component: React.lazy(() => import("~/Pages/Manage/Financials/TransactionDetailsPage"))
  },

  { path: "/resource", component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Resource/ResourcePage")) },
  {
    path: "/resource/:resourceID",
    component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Resource/ResourceDetails"))
  },

  { path: "/product", component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Product/ProductPage")) },
  {
    path: "/product/:productID",
    component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Product/ProductDetails"))
  },

  { path: "/package", component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Package/PackagePage")) },
  {
    path: "/package/:packageID",
    component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Package/PackageDetails"))
  },

  { path: "/catalog", component: React.lazy(() => import("~/Pages/Manage/Promotions/Catalog/CatalogPage")) },
  {
    path: "/catalog/:catalogID",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/Catalog/CatalogDetailsPage"))
  },

  { path: "/tags", component: React.lazy(() => import("~/Pages/Administration/Data/Tags/TagsPage")) },
  { path: "/tags/:tagID", component: React.lazy(() => import("~/Pages/Administration/Data/Tags/TagsDetailsPage")) },

  { path: "/question", component: React.lazy(() => import("~/Pages/Manage/Question/QuestionRepositoryPage")) },
  { path: "/question/response", component: React.lazy(() => import("~/Pages/Manage/Question/QuestionResponsePage")) },
  {
    path: "/question/:PreferenceDefID",
    component: React.lazy(() => import("~/Pages/Manage/Question/QuestionRepositoryDetailsPage"))
  },

  { path: "/request", component: React.lazy(() => import("~/Pages/Manage/Request/RequestPage")) },
  { path: "/request/:requestID", component: React.lazy(() => import("~/Pages/Manage/Request/RequestDetailsPage")) },

  {
    path: "/registration",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Registration/RegistrationPage"))
  },
  {
    path: "/registration/:studentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Registration/Details"))
  },

  { path: "/person", component: React.lazy(() => import("~/Pages/Manage/Constituents/Person/PersonPage")) },
  {
    path: "/person/:personID",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/Person/PersonDetailPage"))
  },
  { path: "/student", component: React.lazy(() => import("~/Pages/Manage/Constituents/Student/StudentPage")) },
  {
    path: "/person/student/:studentID",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/Person/PersonDetailPage"))
  },
  { path: "/instructor", component: React.lazy(() => import("~/Pages/Manage/Constituents/Instructor/InstructorPage")) },
  {
    path: "/person/faculty/:facultyID",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/Person/PersonDetailPage"))
  },

  { path: "/account", component: React.lazy(() => import("~/Pages/Manage/Constituents/Account/AccountPage")) },
  {
    path: "/account/:accountID",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/Account/AccountDetails"))
  },

  { path: "/waitlist", component: React.lazy(() => import("~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryPage")) },
  {
    path: "/waitlist/:waitListEntryID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryDetailsPage"))
  },

  { path: "/program/offering", component: React.lazy(() => import("~/Pages/Manage/Program/Offering/OfferingPage")) },
  {
    path: "/program/offering/:programOfferingID",
    component: React.lazy(() => import("~/Pages/Manage/Program/Offering/OfferingDetailsPage"))
  },
  {
    path: "/program/enrollment",
    component: React.lazy(() => import("~/Pages/Manage/Program/Enrollment/EnrollmentPage"))
  },
  {
    path: "/program/enrollment/:programEnrollmentID",
    component: React.lazy(() => import("~/Pages/Manage/Program/Enrollment/EnrollmentDetailsPage"))
  },
  { path: "/program/application", component: React.lazy(() => import("~/Pages/Program/ProgramApplicationPage")) },
  {
    path: "/program/certificate",
    component: React.lazy(() => import("~/Pages/Manage/Program/Certificate/CertificatePage"))
  },
  {
    path: "/program/certificate/:studentCertificateID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Certificate/CertificateDetailPage"))
  },
  { path: "/program", component: React.lazy(() => import("~/Pages/Manage/Program/Program/ProgramPage")) },
  {
    path: "/program/:programID",
    component: React.lazy(() => import("~/Pages/Manage/Program/Program/ProgramDetailsPage"))
  },
  {
    path: "/program/:programID/student/:studentID/application",
    component: React.lazy(() => import("~/Pages/Manage/Program/Application/ApplicationDetailsPage"))
  },
  {
    path: "/program/:programID/student/:studentID/enrollment",
    component: React.lazy(() => import("~/Pages/Manage/Program/Enrollment/EnrollmentDetailsPage"))
  },

  {
    path: "/search/activity/academic-log",
    component: React.lazy(() => import("~/Pages/Discovery/Search/Activity/AcademicPage"))
  },
  {
    path: "/search/activity/enrollment-log",
    component: React.lazy(() => import("~/Pages/Discovery/Search/Activity/EnrollmentPage"))
  },
  {
    path: "/search/activity/enrollment-history",
    component: React.lazy(() => import("~/Pages/Discovery/Search/Activity/EnrollmentHistoryPage"))
  },
  {
    path: "/search/activity/order-log",
    component: React.lazy(() => import("~/Pages/Discovery/Search/Activity/OrderActivityPage"))
  },

  { path: "/report", component: React.lazy(() => import("~/Pages/Reporting/Report/ReportPage")) },
  { path: "/report/:reportName", component: React.lazy(() => import("~/Pages/Reporting/Report/IndividualReportPage")) },
  {
    path: "/report/financial/purchase-order",
    component: React.lazy(() => import("~/Pages/Reporting/Report/Financial/PurchaseOrder"))
  },

  { path: "/chart", component: React.lazy(() => import("~/Pages/Reporting/Chart/ChartPage")) },
  { path: "/chart/:chartName", component: React.lazy(() => import("~/Pages/Reporting/Chart/ChartDetailsPage")) },

  {
    path: "/course/certificate",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Certificate/CourseCertificatePage"))
  },
  {
    path: "/course/certificate/:studentCertificateID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Certificate/CertificateDetailPage"))
  },

  {
    path: "/marketing-codes/repository",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/PromotionCodes/RepositoryPage"))
  },
  {
    path: "/marketing-codes/repository/:marketingCodeID",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/PromotionCodes/RepositoryDetails"))
  },
  {
    path: "/marketing-codes/response",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/PromotionResponse/ResponsePage"))
  },
  {
    path: "/marketing-codes/response/:orderItemID/:marketingCodeID",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/PromotionResponse/ResponseDetails"))
  },

  {
    path: "/marketing-programs",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/MarketingProgram/MarketingProgramPage"))
  },
  {
    path: "/marketing-programs/:marketingProgramID",
    component: React.lazy(() => import("~/Pages/Manage/Promotions/MarketingProgram/MarketingProgramDetails"))
  },

  {
    path: "/seatgroup/:seatGroupID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SeatGroup/SeatgroupDetails"))
  },
  {
    path: "/forget-me-request",
    component: React.lazy(() => import("~/Pages/Administration/ForgetMeRequest/ForgetMeRequestsPage"))
  },
  {
    path: "/forget-me-request/:AnonymizationRequestID",
    component: React.lazy(() => import("~/Pages/Administration/ForgetMeRequest/ForgetMeRequestDetailsPage"))
  },

  { path: "/batch", component: React.lazy(() => import("~/Pages/Administration/Tools/Batch/BatchPage")) },
  {
    path: "/batch/:BatchImportID",
    component: React.lazy(() => import("~/Pages/Administration/Tools/Batch/BatchDetailsPage"))
  },

  {
    path: "/data/organization",
    component: React.lazy(() => import("~/Pages/Administration/Data/Organizations/OranizationsPage"))
  },
  {
    path: "/data/organization/:OrganizationID",
    component: React.lazy(() => import("~/Pages/Administration/Data/Organizations/OranizationsDetailsPage"))
  },

  { path: "/user", component: React.lazy(() => import("~/Pages/Administration/Users/UsersPage")) },
  { path: "/user/:UserID", component: React.lazy(() => import("~/Pages/Administration/Users/UsersDetailsPage")) },

  {
    path: "/gateway-activity",
    component: React.lazy(() => import("~/Pages/Administration/Audits/GatewayActivity/GatewayActivityPage"))
  },
  {
    path: "/gateway-activity/:PaymentGatewayActivityID",
    component: React.lazy(() => import("~/Pages/Administration/Audits/GatewayActivity/GatewayActivityDetailsPage"))
  },
  {
    path: "/system-schedule",
    component: React.lazy(() => import("~/Pages/Administration/Audits/SystemSchedule/SystemSchedulePage"))
  },
  {
    path: "/system-schedule/:TimerID",
    component: React.lazy(() => import("~/Pages/Administration/Audits/SystemSchedule/SystemScheduleDetailsPage"))
  },
  {
    path: "/data/certificate",
    component: React.lazy(() => import("~/Pages/Administration/Data/Certificates/CertificatesPage"))
  },
  {
    path: "/data/certificate/:CertificateID",
    component: React.lazy(() => import("~/Pages/Administration/Data/Certificates/CertificatesDetailsPage"))
  },
  {
    path: "/data/grade-score-definition",
    component: React.lazy(() => import("~/Pages/Administration/Data/GradeScoreDefinitions/GradeScoreDefinitionsPage"))
  },
  {
    path: "/data/grade-score-definition/:GradeScoreDefinitionID",
    component: React.lazy(() =>
      import("~/Pages/Administration/Data/GradeScoreDefinitions/GradeScoreDefinitionsDetailsPage")
    )
  },
  {
    path: "/job-schedules",
    component: React.lazy(() => import("~/Pages/Administration/Tools/JobSchedules/JobSchedulesPage"))
  },
  {
    path: "/configuration-management",
    component: React.lazy(() => import("~/Pages/Administration/ConfigurationManagement/ConfigurationManagementPage"))
  },

  {
    path: "/offering-type",
    component: React.lazy(() => import("~/Pages/Administration/Data/OfferingType/OfferingTypePage"))
  },
  {
    path: "/offering-type/:OfferingTypeID",
    component: React.lazy(() => import("~/Pages/Administration/Data/OfferingType/OfferingTypeDetailsPage"))
  },

  {
    path: "/section-type",
    component: React.lazy(() => import("~/Pages/Administration/Data/SectionType/SectionTypePage"))
  },
  {
    path: "/section-type/:SectionTypeID",
    component: React.lazy(() => import("~/Pages/Administration/Data/SectionType/SectionTypeDetailsPage"))
  },

  {
    path: "/building",
    component: React.lazy(() => import("~/Pages/Administration/Data/Building/BuildingPage"))
  },
  {
    path: "/building/:BuildingID",
    component: React.lazy(() => import("~/Pages/Administration/Data/Building/BuildingDetailsPage"))
  },
  {
    path: "/room/:RoomID",
    component: React.lazy(() => import("~/Pages/Administration/Data/Building/RoomDetailsPage"))
  },
  {
    path: "/site",
    component: React.lazy(() => import("~/Pages/Administration/Data/Site/SitePage"))
  },
  {
    path: "/site/:SiteID",
    component: React.lazy(() => import("~/Pages/Administration/Data/Site/SiteDetailsPage"))
  },

  {
    path: "/membership",
    component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Memberships/MembershipPage"))
  },
  {
    path: "/membership/:MembershipID",
    component: React.lazy(() => import("~/Pages/Manage/OtherProducts/Memberships/MembershipsDetailsPage"))
  },
  {
    path: "/student-email-notification",
    component: React.lazy(() =>
      import("~/Pages/Administration/Tools/StudentEmailNotification/StudentEmailNotificationPage")
    )
  },
  {
    path: "/student-email-notification/:StudentNoticeID",
    component: React.lazy(() =>
      import("~/Pages/Administration/Tools/StudentEmailNotification/StudentEmailNotificationDetailsPage")
    )
  },
  {
    path: "/queries",
    component: React.lazy(() => import("~/Pages/Reporting/Queries/QueriesPage"))
  },
  {
    path: "/queries/:queryName",
    component: React.lazy(() => import("~/Pages/Reporting/Queries/QueriesDetailsPage"))
  },
  {
    path: "/plcalculator",
    component: React.lazy(() => import("~/Pages/Reporting/MasterPLCalculator/MasterPLCalculatorPage"))
  },
  {
    path: "/section-instructors",
    component: React.lazy(() => import("~/Pages/Reporting/SectionInstructors/SectionInstructorsPage"))
  },
  {
    path: "/reference-data",
    component: React.lazy(() => import("~/Pages/Administration/Data/ReferenceData/ReferenceDataListPage"))
  },
  {
    path: "/reference-data/DueDatePolicy",
    component: React.lazy(() => import("~/Pages/Administration/Data/ReferenceData/DetailsPages/PaymentDueDatePolicy"))
  },
  {
    path: "/reference-data/TranscriptTypeCreditSetup/:ID/CreditSetup",
    component: React.lazy(() =>
      import("~/Pages/Administration/Data/ReferenceData/DetailsPages/TranscriptTypeCreditDetailsPage")
    )
  },
  {
    path: "/reference-data/:refName",
    component: React.lazy(() => import("~/Pages/Administration/Data/ReferenceData/ReferenceDataPage"))
  },
  {
    path: "/reference-data/:LookUpName/:ID/tags",
    component: React.lazy(() => import("~/Pages/Administration/Data/ReferenceData/DetailsPages/LookupTagDetailsPage"))
  }
]
