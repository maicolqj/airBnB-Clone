import React from 'react'
import { PublicationsProvider } from './src/context/publicationContext/PublicationContext'
import InitialStackNavigation from './src/routes/stackNavigation/InitialStackNavigation'
import { AuthProvider } from './src/context/publicationContext/AuthContext'


const AppContextState = ({children}: any) => {
  return (
    <AuthProvider>
      <PublicationsProvider>
        {children}
      </PublicationsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <AppContextState>
      <InitialStackNavigation/>
    </AppContextState>
  )
}




export default App
