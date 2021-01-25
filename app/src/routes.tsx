import React from "react"
import { RouteProps } from "react-router-dom"
// import HomePage from "~/Pages/HomePage"
// import AboutPage from "~/Pages/AboutPage"
// import AdminPage from "~/Pages/AdminPage"

// import { OfferingPage } from "~/Pages/Offering/index"
// import OfferingDetailsPage from "~/Pages/Manage/Courses/Offering/Details"
// import OfferingFinancialPage from "~/Pages/Manage/Courses/Offering/Financial/FinancialPage"
// import OfferingCatalogPage from "~/Pages/Manage/Courses/Offering/Catalog"
// import OfferingRequisitePage from "~/Pages/Manage/Courses/Offering/Requisite"
// import OfferingApprovalPage from "~/Pages/Manage/Courses/Offering/Approval"
// import OfferingTaggPage from "~/Pages/Manage/Courses/Offering/TagPage"
// import OfferingQualifiedInstructorPage from "~/Pages/Manage/Courses/Offering/QualifiedInstructor/QualifiedInstructorPage"
// import OfferingSectionPage from "~/Pages/Manage/Courses/Offering/Section"

// import SectionPage from "~/Pages/Manage/Courses/Section"
// import SectionDetailsPage from "~/Pages/Manage/Courses/Section/Details"
// import SectionSeatgroupPage from "~/Pages/Manage/Courses/Section/SeatGroup/SeatgroupPage"
// import SectionCatalogPage from "~/Pages/Manage/Courses/Section/Catalog"
// import SectionSchedulePage from "~/Pages/Manage/Courses/Section/Schedule"
// import SectionBudgetPage from "~/Pages/Manage/Courses/Section/Budget/BudgetPage"
// import SectionNoticePage from "~/Pages/Manage/Courses/Section/Notice/NoticePage"
// import SectionDiscountPage from "~/Pages/Manage/Courses/Section/Discount/DiscountPage"
// import SectionRegistrationPage from "~/Pages/Manage/Courses/Section/Registration"
// import SectionTagPage from "~/Pages/Manage/Courses/Section/TagPage"

// import SectionProductPage from "~/Pages/Manage/Courses/Section/Product/ProductPage"
// import SectionWaitlistEntriesPage from "~/Pages/Manage/Courses/Section/WaitlistEntries"
// import SectionAcademicLogPage from "~/Pages/Manage/Courses/Section/SectionAcademicLog"
// import SectionEnrollmentLogPage from "~/Pages/Manage/Courses/Section/SectionEnrollmentLog"
// import SectionOrderLogPage from "~/Pages/Manage/Courses/Section/SectionOrderLog"
// import SectionOrderManagementPage from "~/Pages/Manage/Courses/Section/Financial/Orders"
// import SectionOrderItemsPage from "~/Pages/Manage/Courses/Section/Financial/OrderItems"
// import SectionOrderPaymentsPage from "~/Pages/Manage/Courses/Section/Financial/Payments"
// import PaymentDetails from "~/Pages/Manage/Courses/Section/Financial/PaymentDetails"
// import SectionOrderDetails from "~/Pages/Manage/Courses/Section/Financial/OrderDetails"
// import SectionCommentPage from "~/Pages/Manage/Courses/Section/Comment"
// import SectionNoShowPage from "~/Pages/Manage/Courses/Section/NoShow"
// import SectionRequestPage from "~/Pages/Manage/Courses/Section/RequestPage"
// import RequestPage from "~/Pages/Manage/Request/RequestPage"
// import RequestDetailsPage from "~/Pages/Manage/Request/RequestDetailsPage"

// import CourseCertificatePage from "~/Pages/Manage/Courses/Certificate/CourseCertificatePage"
// import ProgramCertificatePage from "~/Pages/Manage/Program/CertificatePage"
// import CertificateDetailPage from "~/Pages/Manage/Courses/Certificate/CertificateDetailPage"

// import PersonPage from "~/Pages/Manage/Constituents/Person/PersonPage"
// import PersonDetailPage from "~/Pages/Manage/Constituents/Person/PersonDetailPage"

// import StudentPage from "~/Pages/Manage/Constituents/Student/StudentPage"

// import InstructorPage from "~/Pages/Manage/Constituents/Instructor/InstructorPage"

// import AccountPage from "~/Pages/Manage/Constituents/Account/AccountPage"
// import AccountDetailsPage from "~/Pages/Manage/Constituents/Account/AccountDetails"

// import ProductPage from "~/Pages/Manage/Product/ProductPage"
// import ProductDetailsPage from "~/Pages/Manage/Product/ProductDetails"

// import CatalogPage from "~/Pages/Manage/MarketingCodes/Catalog/CatalogPage"
// import CatalogDetailsPage from "~/Pages/Manage/MarketingCodes/Catalog/CatalogDetailsPage"

// import ProgramEnrollmentPage from "~/Pages/Program/ProgramEnrollmentPage"
// import ProgramApplicationPage from "~/Pages/Program/ProgramApplicationPage"

// import RegistrationPage from "~/Pages/Manage/Courses/Registration/RegistrationPage"
// import RegistrationDetailsPage from "~/Pages/Manage/Courses/Registration/Details"

// import WaitlistEntriesPage from "~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryPage"
// import WaitlistEntryDetailsPage from "~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryDetailsPage"
// import AcademicPage from "~/Pages/Discovery/Search/Activity/AcademicPage"
// import EnrollmentPage from "~/Pages/Discovery/Search/Activity/EnrollmentPage"
// import EnrollmentHistoryPage from "~/Pages/Discovery/Search/Activity/EnrollmentHistoryPage"
// import OrderLogPage from "~/Pages/Discovery/Search/Activity/OrderActivityPage"

// import ReportPage from "~/Pages/Discovery/Report/ReportPage"
// import IndividualReportPage from "~/Pages/Discovery/Report/IndividualReportPage"
// import FinancialReportPurchaseOrder from "~/Pages/Discovery/Report/Financial/PurchaseOrder"

// import QuestionPage from "~/Pages/Manage/Question/QuestionRepositoryPage"
// import QuestionResponsePage from "~/Pages/Manage/Question/QuestionResponsePage"

// import FinancialOrderPagePage from "~/Pages/Manage/Financials/OrderPage"
// import OrderDetailsPage from "~/Pages/Manage/Financials/OrderDetailsPage"
// import FinancialOrderItemPage from "~/Pages/Manage/Financials/OrderItemPage"
// import FinancialOrderCreditsPage from "~/Pages/Manage/Financials/OrderCreditsPage"
// import FinancialPaymentPage from "~/Pages/Manage/Financials/PaymentPage"
// import FinancialDiscountProgramPage from "~/Pages/Manage/Financials/DiscountProgramPage"
// import FinancialDiscountProgramDetailsPage from "~/Pages/Manage/Financials/DiscountProgramDetailsPage"
// import FinancialTransactionPage from "~/Pages/Manage/Financials/TransactionPage"
// import FinancialTransactionDetailsPage from "~/Pages/Manage/Financials/TransactionDetailsPage"

// import ChartPage from "~/Pages/Discovery/Chart/ChartPage"
// import ChartDetailsPage from "~/Pages/Discovery/Chart/ChartDetailsPage"
// import ProgramProgramPage from "~/Pages/Manage/Program/ProgramPage"
// import ProgramDetailsPage from "~/Pages/Manage/Program/ProgramDetailsPage"
// import ProgramOfferingPage from "~/Pages/Manage/Program/OfferingPage"
// import ProgramOfferingDetailsPage from "~/Pages/Manage/Program/OfferingDetailsPage"
// import MarketingCodeRepositoryPage from "~/Pages/Manage/MarketingCodes/RepositoryPage"
// import MarketingCodeRepositoryDetailsPage from "~/Pages/Manage/MarketingCodes/RepositoryDetails"
// import MarketingCodeResponsePage from "~/Pages/Manage/MarketingCodes/ResponsePage"
// import MarketingCodeResponseDetailsPage from "~/Pages/Manage/MarketingCodes/ResponseDetails"
// import TagsPage from "~/Pages/Manage/Tags/TagsPage"
// import TagsDetailsPage from "~/Pages/Manage/Tags/TagsDetailsPage"
// import QuestionRepositoryDetailsPage from "~/Pages/Manage/Question/QuestionRepositoryDetailsPage"
// import ForgetMeRequestsPage from "~/Pages/Manage/Constituents/ForgetMeRequest/ForgetMeRequestsPage"
// import ForgetMeRequestDetailsPage from "~/Pages/Manage/Constituents/ForgetMeRequest/ForgetMeRequestDetailsPage"
// import BatchPage from "~/Pages/Manage/Batch/BatchPage"
// import BatchDetailsPage from "~/Pages/Manage/Batch/BatchDetailsPage"
// import SeatGroupDetailsPage from "~/Pages/Manage/SeatgroupDetails"
// import ResourcePage from "~/Pages/Manage/Resource/ResourcePage"
// import ResourceDetailsPage from "~/Pages/Manage/Resource/ResourceDetails"
// import OranizationsPage from "~/Pages/SetupAdministration/Data/Organizations/OranizationsPage"
// import OranizationsDetailsPage from "~/Pages/SetupAdministration/Data/Organizations/OranizationsDetailsPage"
// import MarketingProgramPage from "~/Pages/Manage/MarketingCodes/ProgramPage"
// import MarketingProgramDetailsPage from "~/Pages/Manage/MarketingCodes/ProgramDetails"
// import UsersPage from "~/Pages/SetupAdministration/Users/UsersPage"
// import UsersDetailsPage from "~/Pages/SetupAdministration/Users/UsersDetailsPage"
// import PackagePage from "~/Pages/Manage/Package/PackagePage"
// import PackageDetailsPage from "~/Pages/Manage/Package/PackageDetails"
// import ProgramEnrollmentDetailsPage from "~/Pages/Manage/Program/EnrollmentDetailsPage"
// import ProgramApplicationDetailsPage from "~/Pages/Manage/Program/ApplicationDetailsPage"

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
  {
    path: "/offering/:offeringID/financial",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Financial/FinancialPage"))
  },
  {
    path: "/offering/:offeringID/catalog",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Catalog"))
  },
  {
    path: "/offering/:offeringID/approval",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Approval"))
  },
  {
    path: "/offering/:offeringID/requisite",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Requisite"))
  },
  {
    path: "/offering/:offeringID/instructor",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/QualifiedInstructor/QualifiedInstructorPage"))
  },
  { path: "/offering/:offeringID/tag", component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/TagPage")) },
  {
    path: "/offering/:offeringID/section",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Offering/Section"))
  },
  {
    path: "/offering/:offeringID/section/:sectionID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Details"))
  },

  { path: "/section", component: React.lazy(() => import("~/Pages/Manage/Courses/Section")) },
  {
    path: "/section/:sectionID/catalog",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Catalog"))
  },
  {
    path: "/section/:sectionID/seatgroup",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SeatGroup/SeatgroupPage"))
  },
  {
    path: "/section/:sectionID/schedule",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Schedule"))
  },
  {
    path: "/section/:sectionID/budget",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Budget/BudgetPage"))
  },
  {
    path: "/section/:sectionID/discount",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Discount/DiscountPage"))
  },
  {
    path: "/section/:sectionID/notification",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Notice/NoticePage"))
  },
  { path: "/section/:sectionID/tag", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/TagPage")) },
  {
    path: "/section/:sectionID/registration/:studentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Registration/Details"))
  },
  {
    path: "/section/:sectionID/registration",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Registration"))
  },
  {
    path: "/section/:sectionID/order/payments/:paymentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/PaymentDetails"))
  },
  {
    path: "/section/:sectionID/order/payments",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/Payments"))
  },
  {
    path: "/section/:sectionID/order/items",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/OrderItems"))
  },
  {
    path: "/section/:sectionID/order/:orderID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/OrderDetails"))
  },
  {
    path: "/section/:sectionID/order",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/Orders"))
  },
  {
    path: "/section/:sectionID/product",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Product/ProductPage"))
  },
  { path: "/section/:sectionID", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Details")) },
  {
    path: "/section/:sectionID/waitlist",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/WaitlistEntries"))
  },
  {
    path: "/section/:sectionID/waitlist/:waitListEntryID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryDetailsPage"))
  },
  {
    path: "/section/:sectionID/academic-log",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionAcademicLog"))
  },
  {
    path: "/section/:sectionID/enrollment-log",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionEnrollmentLog"))
  },
  {
    path: "/section/:sectionID/order-log",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/SectionOrderLog"))
  },
  {
    path: "/section/:sectionID/comment",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Comment"))
  },
  { path: "/section/:sectionID/no-show", component: React.lazy(() => import("~/Pages/Manage/Courses/Section/NoShow")) },
  {
    path: "/section/:sectionID/request",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/RequestPage"))
  },
  {
    path: "/section/:secitonID/request/:requestID",
    component: React.lazy(() => import("~/Pages/Manage/Request/RequestDetailsPage"))
  },

  { path: "/order/items", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderItemPage")) },
  { path: "/order/credits", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderCreditsPage")) },
  { path: "/order/payments", component: React.lazy(() => import("~/Pages/Manage/Financials/PaymentPage")) },
  { path: "/order", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderPage")) },
  { path: "/order/:orderID", component: React.lazy(() => import("~/Pages/Manage/Financials/OrderDetailsPage")) },
  {
    path: "/order/payments/:paymentID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Section/Financial/PaymentDetails"))
  },

  { path: "/discount-program", component: React.lazy(() => import("~/Pages/Manage/Financials/DiscountProgramPage")) },
  {
    path: "/discount-program/:discountProgramID",
    component: React.lazy(() => import("~/Pages/Manage/Financials/DiscountProgramDetailsPage"))
  },

  { path: "/transaction", component: React.lazy(() => import("~/Pages/Manage/Financials/TransactionPage")) },
  {
    path: "/transaction/:depositID",
    component: React.lazy(() => import("~/Pages/Manage/Financials/TransactionDetailsPage"))
  },

  { path: "/resource", component: React.lazy(() => import("~/Pages/Manage/Resource/ResourcePage")) },
  { path: "/resource/:resourceID", component: React.lazy(() => import("~/Pages/Manage/Resource/ResourceDetails")) },

  { path: "/product", component: React.lazy(() => import("~/Pages/Manage/Product/ProductPage")) },
  { path: "/product/:productID", component: React.lazy(() => import("~/Pages/Manage/Product/ProductDetails")) },

  { path: "/package", component: React.lazy(() => import("~/Pages/Manage/Package/PackagePage")) },
  { path: "/package/:packageID", component: React.lazy(() => import("~/Pages/Manage/Package/PackageDetails")) },

  { path: "/catalog", component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/Catalog/CatalogPage")) },
  {
    path: "/catalog/:catalogID",
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/Catalog/CatalogDetailsPage"))
  },

  { path: "/tags", component: React.lazy(() => import("~/Pages/Manage/Tags/TagsPage")) },
  { path: "/tags/:tagID", component: React.lazy(() => import("~/Pages/Manage/Tags/TagsDetailsPage")) },

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

  { path: "/program/offering", component: React.lazy(() => import("~/Pages/Manage/Program/OfferingPage")) },
  {
    path: "/program/offering/:programOfferingID",
    component: React.lazy(() => import("~/Pages/Manage/Program/OfferingDetailsPage"))
  },
  { path: "/program/enrollment", component: React.lazy(() => import("~/Pages/Program/ProgramEnrollmentPage")) },
  {
    path: "/program/enrollment/:programEnrollmentID",
    component: React.lazy(() => import("~/Pages/Manage/Program/EnrollmentDetailsPage"))
  },
  { path: "/program/application", component: React.lazy(() => import("~/Pages/Program/ProgramApplicationPage")) },
  { path: "/program/certificate", component: React.lazy(() => import("~/Pages/Manage/Program/CertificatePage")) },
  {
    path: "/program/certificate/:studentCertificateID",
    component: React.lazy(() => import("~/Pages/Manage/Courses/Certificate/CertificateDetailPage"))
  },
  { path: "/program/program", component: React.lazy(() => import("~/Pages/Manage/Program/ProgramPage")) },
  { path: "/program/:programID", component: React.lazy(() => import("~/Pages/Manage/Program/ProgramDetailsPage")) },
  {
    path: "/program/:programID/student/:studentID/application",
    component: React.lazy(() => import("~/Pages/Manage/Program/ApplicationDetailsPage"))
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
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/RepositoryPage"))
  },
  {
    path: "/marketing-codes/repository/:marketingCodeID",
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/RepositoryDetails"))
  },
  {
    path: "/marketing-codes/response",
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/ResponsePage"))
  },
  {
    path: "/marketing-codes/response/:orderItemID/:marketingCodeID",
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/ResponseDetails"))
  },

  { path: "/marketing-programs", component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/ProgramPage")) },
  {
    path: "/marketing-programs/:marketingProgramID",
    component: React.lazy(() => import("~/Pages/Manage/MarketingCodes/ProgramDetails"))
  },

  { path: "/seatgroup/:seatGroupID", component: React.lazy(() => import("~/Pages/Manage/SeatgroupDetails")) },
  {
    path: "/forget-me-request",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/ForgetMeRequest/ForgetMeRequestsPage"))
  },
  {
    path: "/forget-me-request/:AnonymizationRequestID",
    component: React.lazy(() => import("~/Pages/Manage/Constituents/ForgetMeRequest/ForgetMeRequestDetailsPage"))
  },

  { path: "/batch", component: React.lazy(() => import("~/Pages/Manage/Batch/BatchPage")) },
  { path: "/batch/:BatchImportID", component: React.lazy(() => import("~/Pages/Manage/Batch/BatchDetailsPage")) },

  {
    path: "/data/organization",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Organizations/OranizationsPage"))
  },
  {
    path: "/data/organization/:OrganizationID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Organizations/OranizationsDetailsPage"))
  },

  { path: "/user", component: React.lazy(() => import("~/Pages/SetupAdministration/Users/UsersPage")) },
  { path: "/user/:UserID", component: React.lazy(() => import("~/Pages/SetupAdministration/Users/UsersDetailsPage")) },

  {
    path: "/gateway-activity",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Audits/GatewayActivity/GatewayActivityPage"))
  },
  {
    path: "/gateway-activity/:PaymentGatewayActivityID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Audits/GatewayActivity/GatewayActivityDetailsPage"))
  },
  {
    path: "/system-schedule",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Audits/SystemSchedule/SystemSchedulePage"))
  },
  {
    path: "/system-schedule/:TimerID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Audits/SystemSchedule/SystemScheduleDetailsPage"))
  },
  {
    path: "/data/certificate",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Certificates/CertificatesPage"))
  },
  {
    path: "/data/certificate/:CertificateID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Certificates/CertificatesDetailsPage"))
  },
  {
    path: "/data/grade-score-definition",
    component: React.lazy(() =>
      import("~/Pages/SetupAdministration/Data/GradeScoreDefinitions/GradeScoreDefinitionsPage")
    )
  },
  {
    path: "/data/grade-score-definition/:GradeScoreDefinitionID",
    component: React.lazy(() =>
      import("~/Pages/SetupAdministration/Data/GradeScoreDefinitions/GradeScoreDefinitionsDetailsPage")
    )
  },
  {
    path: "/job-schedule",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Tools/JobSchedules/JobSchedulesPage"))
  },
  {
    path: "/configuration-management",
    component: React.lazy(() =>
      import("~/Pages/SetupAdministration/ConfigurationManagement/ConfigurationManagementPage")
    )
  },

  {
    path: "/offering-type",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/OfferingType/OfferingTypePage"))
  },
  {
    path: "/offering-type/:OfferingTypeID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/OfferingType/OfferingTypeDetailsPage"))
  },

  {
    path: "/section-type",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/SectionType/SectionTypePage"))
  },
  {
    path: "/section-type/:SectionTypeID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/SectionType/SectionTypeDetailsPage"))
  },

  {
    path: "/building",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Building/BuildingPage"))
  },
  {
    path: "/building/:BuildingID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Building/BuildingDetailsPage"))
  },
  {
    path: "/room/:RoomID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Building/RoomDetailsPage"))
  },
  {
    path: "/site",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Site/SitePage"))
  },
  {
    path: "/site/:SiteID",
    component: React.lazy(() => import("~/Pages/SetupAdministration/Data/Site/SiteDetailsPage"))
  },

  {
    path: "/membership",
    component: React.lazy(() => import("~/Pages/Manage/Memberships/MembershipPage"))
  },
  {
    path: "/membership/:MembershipID",
    component: React.lazy(() => import("~/Pages/Manage/Memberships/MembershipsDetailsPage"))
  },
  {
    path: "/student-email-notification",
    component: React.lazy(() =>
      import("~/Pages/SetupAdministration/Tools/StudentEmailNotification/StudentEmailNotificationPage")
    )
  },
  {
    path: "/student-email-notification/:StudentNoticeID",
    component: React.lazy(() =>
      import("~/Pages/SetupAdministration/Tools/StudentEmailNotification/StudentEmailNotificationDetailsPage")
    )
  },
  {
    path: "/section-instructors",
    component: React.lazy(() => import("~/Pages/Reporting/SectionInstructors/SectionInstructorsPage"))
  }
]
