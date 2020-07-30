import { login } from '@packages/api/lib/Login'
import eventBus from '@packages/api/lib/utils/GlobalHttpErrorEventBus'

const NETWORK_LATENCY = 2000

export function loginWrapper(UserName: string, UserPassword: string) {
  // Mock implementations
  if (UserName === 'tahmid' && UserPassword === '123456') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            access_token: '993dfjhe9ufher89ugf83u58gfu8gf8rgu8u',
            profile: {
              name: 'tahmid'
            }
          },
          undefined
        ])
      }, NETWORK_LATENCY)
    }) as Promise<Array<any>>
  } else if (UserName === 'tahmid1' || UserPassword === '1234567') {
    const error = {
      status: 500,
      type: 1,
      error: 'Internal server error',
      data: null
    }
    eventBus.publish(error)
    return Promise.reject([undefined, undefined])
  } else if (UserName !== 'tahmid' || UserPassword !== '123456') {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject([
          undefined,
          {
            status: 404,
            type: 1,
            error: 'Username or password did not match',
            data: null
          }
        ])
      }, NETWORK_LATENCY)
    }) as Promise<Array<any>>
  } else {
    return Promise.reject([undefined, undefined])
  }
}
