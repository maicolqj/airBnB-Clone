import React from 'react'
import InitialStackNavigation from './src/presentation/routes/stackNavigation/InitialStackNavigation'
import { PublicationsProvider } from './src/presentation/context/publicationContext/PublicationContext'

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
