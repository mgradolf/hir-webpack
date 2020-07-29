import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '~/store'
import { authenticate } from '~/store/authentication/actions'

interface ILoginPageProps extends IConnectProps, IDispatchProps {}

interface IConnectProps {
  loggingIn: boolean
}

interface IDispatchProps {
  login: (username: string, password: string) => void
}

interface ILoginPageState {
  UserName: string
  UserPassword: string
  submitted: boolean
  loader?: boolean
}

type IFieldName = Exclude<keyof ILoginPageState, 'submitted' | 'loader'>

type IFormState = {
  [key in IFieldName]: string
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props)

    this.state = {
      UserName: '',
      UserPassword: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState({ [name]: value } as IFormState)
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    this.setState({ submitted: true, loader: true })
    const { UserName, UserPassword } = this.state
    if (UserName && UserPassword) {
      this.props.login(UserName, UserPassword)
    }
  }

  render() {
    const { loggingIn } = this.props
    const { UserName, UserPassword, submitted } = this.state

    return (
      <div>
        <div>
          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              <label>User Name </label>
              <input
                type="text"
                name="UserName"
                value={UserName}
                onChange={this.handleChange}
              />
              {submitted && !UserName && <div>Username is required</div>}
            </div>
            <div>
              <label>Password </label>
              <input
                type="password"
                name="UserPassword"
                value={UserPassword}
                onChange={this.handleChange}
              />
              {submitted && !UserPassword && <div>Password is required</div>}
            </div>
            <div>
              <button type="submit">Login</button>
              {loggingIn && (
                <img
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  alt="loading-spinner"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const { loggingIn } = state.authentication
  return { loggingIn }
}

const actionCreators = {
  login: authenticate
}

export default connect(mapStateToProps, actionCreators)(LoginPage)
