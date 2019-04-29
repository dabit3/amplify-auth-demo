import React from 'react'
import AmplifyLogo from './amplifyorange.png'

export default function Header() {
  return (
    <div style={styles.container}>
      <img
        src={AmplifyLogo}
        style={styles.image}
      />
      <p style={styles.header}>Amplify Auth Demo</p>
    </div>
  )
}

const styles = {
  container: {
    padding: 20,
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: 65,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, .1)'
  },
  header: {
    margin: 0,
    color: 'white',
    fontSize: 24,
    marginLeft: 9,
    fontWeight: '300',
    marginTop: -3,
    color: 'rgb(255, 153, 0)'
  },
  image: {
    height: 22
  }
}