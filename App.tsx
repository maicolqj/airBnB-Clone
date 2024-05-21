import React from 'react'
import { PublicationsProvider } from './src/context/PublicationContext'
import InitialStackNavigation from './src/routes/stackNavigation/InitialStackNavigation'
import { AuthProvider } from './src/context/AuthContext'
import { ReserveProvider } from './src/context/ReserveContext'
import { ProfileProvider } from './src/context/ProfileContext'
import { ChatProvider } from './src/context/ChatContext'
import { CommonsProvider } from './src/context/CommonsContext'


const AppContextState = ({children}: any) => {
  return (
    <AuthProvider>
      <PublicationsProvider>
        <ReserveProvider>
          <ProfileProvider>
            <ChatProvider>
              <CommonsProvider>
                {children}  
              </CommonsProvider>
            </ChatProvider>
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
