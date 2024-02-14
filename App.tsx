import React from 'react'
import { PublicationsProvider } from './src/context/PublicationContext'
import InitialStackNavigation from './src/routes/stackNavigation/InitialStackNavigation'
import { AuthProvider } from './src/context/AuthContext'
import { ReserveProvider } from './src/context/ReserveContext'
import { ProfileProvider } from './src/context/ProfileContext'


const AppContextState = ({children}: any) => {
  return (
    <AuthProvider>
      <PublicationsProvider>
        <ReserveProvider>
          <ProfileProvider>
            {children}  
          </ProfileProvider>
        </ReserveProvider>
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
