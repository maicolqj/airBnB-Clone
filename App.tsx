import React from 'react'
import { PublicationsProvider } from './src/context/publicationContext/PublicationContext'
import InitialStackNavigation from './src/routes/stackNavigation/InitialStackNavigation'

const App = () => {
  return (
    <AppContextState>
      <InitialStackNavigation/>
    </AppContextState>
  )
}


const AppContextState = ({children}: any) => {
  return (
    <PublicationsProvider>
      {children}
    </PublicationsProvider>
  )
}

export default App
