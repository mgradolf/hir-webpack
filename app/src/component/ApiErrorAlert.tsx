import React from "react"
import { connect } from "react-redux"
import { AppState } from "~/store"
import { removeGLobalApiError } from "~/store/GlobalError"

function ApiErrorAlert(props: any) {
  return (
    <div>
      <p>
        {props.errorMessage}
        <button onClick={props.removeGLobalApiError}>x</button>
      </p>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return { errorMessage: state.globalApiError.errorMessage }
}

export default connect(mapStateToProps, { removeGLobalApiError })(ApiErrorAlert)
