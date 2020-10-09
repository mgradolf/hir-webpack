import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppStore, AppState } from "~/Store/index"
import { Provider, connect } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import LoginPage from "~/Pages/Login/LoginPage"
// // import HomePage from "~/Pages/HomePage"
import ProfilePage from "~/Pages/ProfilePage"
import AboutPage from "~/Pages/AboutPage"
import AdminPage from "~/Pages/AdminPage"
import NotFoundPage from "~/Pages/NotFoundPage"

import OfferingPage from "~/Pages/Offering/index"
import OfferingDetailsPage from "~/Pages/Offering/Details"
import OfferingFinancialPage from "~/Pages/Offering/Financial"
import OfferingCatalogPage from "~/Pages/Offering/Catalog"
import OfferingRequisitePage from "~/Pages/Offering/Requisite"
import OfferingApprovalPage from "~/Pages/Offering/Approval"
import OfferingTaggPage from "~/Pages/Offering/Tag"
import OfferingQualifiedInstructorPage from "~/Pages/Offering/QualifiedInstructor"
import OfferingSectionPage from "~/Pages/Offering/Section"

import SectionPage from "~/Pages/Section"
import SectionDetailsPage from "~/Pages/Section/Details"
import SectionSeatgroupPage from "~/Pages/Section/SeatGroup"
import SectionCatalogPage from "~/Pages/Section/Catalog"
import SectionSchedulePage from "~/Pages/Section/Schedule"
import SectionBudgetPage from "~/Pages/Section/Budget"
import SectionNoticePage from "~/Pages/Section/Notice"
import SectionDiscountPage from "~/Pages/Section/Discount"
import RegistrationPage from "~/Pages/Section/Registration"
import SectionTagPage from "~/Pages/Section/Tag"
import RequestPage from "~/Pages/Section/Request"
import SectionProductPage from "~/Pages/Section/Product"
import WaitlistEntriesPage from "~/Pages/Section/WaitlistEntries"
import SectionAcademicLogPage from "~/Pages/Section/AcademicLog"
import SectionEnrollmentLogPage from "~/Pages/Section/EnrollmentLog"
import SectionOrderLogPage from "~/Pages/Section/OrderLog"

import QuestionPage from "~/Pages/QuestionPage"

import DefaultLayout from "~/Layout/DefaultLayout"
import ModalContainer from "~/Component/ModalContainer"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
}

function App(props: AppProps): JSX.Element {
  const route: JSX.Element = props.redirectToLogin ? (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to={{ pathname: "/login" }} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={OfferingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/admin" component={AdminPage} />

      <Route exact path="/offering" component={OfferingPage} />
      <Route exact path="/offering/:offeringID" component={OfferingDetailsPage} />
      <Route exact path="/offering/:offeringID/financial" component={OfferingFinancialPage} />
      <Route exact path="/offering/:offeringID/catalog" component={OfferingCatalogPage} />
      <Route exact path="/offering/:offeringID/approval" component={OfferingApprovalPage} />
      <Route exact path="/offering/:offeringID/requisite" component={OfferingRequisitePage} />
      <Route exact path="/offering/:offeringID/instructor" component={OfferingQualifiedInstructorPage} />
      <Route exact path="/offering/:offeringID/tag" component={OfferingTaggPage} />
      <Route exact path="/offering/:offeringID/section" component={OfferingSectionPage} />
      <Route exact path="/offering/:offeringID/section/:sectionID" component={SectionDetailsPage} />

      <Route exact path="/section" component={SectionPage} />
      <Route exact path="/section/:sectionID" component={SectionDetailsPage} />
      <Route exact path="/section/:sectionID/catalog" component={SectionCatalogPage} />
      <Route exact path="/section/:sectionID/seatgroup" component={SectionSeatgroupPage} />
      <Route exact path="/section/:sectionID/schedule" component={SectionSchedulePage} />
      <Route exact path="/section/:sectionID/budget" component={SectionBudgetPage} />
      <Route exact path="/section/:sectionID/discount" component={SectionDiscountPage} />
      <Route exact path="/section/:sectionID/notification" component={SectionNoticePage} />
      <Route exact path="/section/:sectionID/question" component={QuestionPage} />
      <Route exact path="/section/:sectionID/registration" component={RegistrationPage} />
      <Route exact path="/section/:sectionID/tag" component={SectionTagPage} />
      <Route exact path="/section/:sectionID/request" component={RequestPage} />
      <Route exact path="/section/:sectionID/product" component={SectionProductPage} />
      <Route exact path="/section/:sectionID/waitlist" component={WaitlistEntriesPage} />
      <Route exact path="/section/:sectionID/academic" component={SectionAcademicLogPage} />
      <Route exact path="/section/:sectionID/enrollment" component={SectionEnrollmentLogPage} />
      <Route exact path="/section/:sectionID/order" component={SectionOrderLogPage} />

      {/* <Route exact path="/question" component={QuestionPage} /> */}
      <Route component={NotFoundPage} />
    </Switch>
  )
  return (
    <Provider store={props.store}>
      <ModalContainer />
      <ConnectedRouter history={props.history}>
        {/* Should be refactored later as condition check gets repeated */}
        {props.redirectToLogin ? route : <DefaultLayout>{route}</DefaultLayout>}
      </ConnectedRouter>
    </Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin
  }
}
export default connect(mapStateToProps)(App)
