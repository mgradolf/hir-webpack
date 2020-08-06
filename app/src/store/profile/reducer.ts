import { Action } from 'redux'

interface UserDetails {
  id: string
  role: string
  name: string
  scope: string[]
}

export type ProfileState = {
  authenticated: boolean
  userDetails: UserDetails | null
}

const INITIAL_PROFILE_STATE: ProfileState = {
  authenticated: false,
  userDetails: null
}

export const profileReducer = (
  state = INITIAL_PROFILE_STATE,
  action: Action
): ProfileState => {
  switch (action.type) {
    // Profile actions to be added here
    default:
      return state
  }
}
