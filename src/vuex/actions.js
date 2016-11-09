export const showError = ({dispatch}) => {
  dispatch('SET_ERROR_VISIBLE', true)
}

export const hideError = ({dispatch}) => {
  dispatch('SET_ERROR_VISIBLE', false)
}

export const setError = ({dispatch}, error) => {
  let errorMsg = error
  if (typeof errorMsg === 'string') {
    errorMsg = error
  } else {
    errorMsg = JSON.parse(errorMsg.body).message
  }
  dispatch('SET_ERROR', errorMsg)
  showError({dispatch})
  setTimeout(() => {
    hideError({dispatch})
  }, 4000)
}

export const setRepo = ({dispatch}, fullRepoName) => {
  let splitData = fullRepoName.split('/')
  let username = splitData[0]
  let repo = splitData[1]

  console.group('Vue Data')
  console.log('fullRepoName:', fullRepoName)
  console.log('username:', username)
  console.log('repo:', repo)
  console.groupEnd('Vue Data')

  if (username && repo) {
    dispatch('SET_USERNAME', username)
    dispatch('SET_REPO', repo)
  } else {
    setError({dispatch}, 'Invalid input.')
  }
}

export const setSwitchState = ({dispatch}, state) => {
  dispatch('SET_SWITCH_STATE', state)
}
