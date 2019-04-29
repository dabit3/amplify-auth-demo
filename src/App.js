import React, { useReducer, useEffect } from 'react';
import './App.css'
import Header from './Header'
import Buttons from './Buttons'
import { Hub } from 'aws-amplify'

import { Auth } from 'aws-amplify'
import { withOAuth } from 'aws-amplify-react'
import { FaSignOutAlt } from 'react-icons/fa'

function reducer (state, action) {
  switch(action.type) {
    case 'setUser':  
      return { ...state, user: action.user, loading: false }
    case 'loaded':
      return { ...state, loading: false }
  }
}

const initialState = { user: null, loading: true }

function App() {
  const [userState, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (!window.location.pathname.includes('/profile')) {
      checkUser(dispatch)
    }
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signIn') {
        setImmediate(() => dispatch({ type: 'setUser', user: payload.data }))
      }
    })
  }, [])
  

  return (
    <div style={styles.appContainer}>
      <Header />
      {
        userState.loading && <p>Loading...</p>
      }
      {
        !userState.user && !userState.loading && (
          <Buttons />
        )
      }
      {
        userState.user && userState.user.signInUserSession && (
          <h4>
            Welcome {userState.user.signInUserSession.idToken.payload.email}
            <button
              style={{ ...styles.button, ...styles.signOut }}
              onClick={signOut}
            >
              <FaSignOutAlt color='white' />
              <p style={{...styles.text}}>Sign Out</p>
            </button>
          </h4>
        )
      }
    </div>
  )
}

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    dispatch({ type: 'setUser', user })
  } catch (err) {
    dispatch({ type: 'loaded' })
  }
}

function signOut() {
  Auth.signOut()
    .then(data => {
      console.log('signed out: ', data)
    })
    .catch(err => console.log(err));
}

const styles = {
  appContainer: {
    paddingTop: 85,
    paddingLeft: 20
  },
  loading: {
    
  },
  button: {
    marginTop: 15,
    width: '100%', 
    maxWidth: 250,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0px 16px',
    borderRadius: 2,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    minHeight: 40
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  signOut: {
    backgroundColor: 'black'
  },
}

export default withOAuth(App)
