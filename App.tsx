import React, { useEffect } from 'react'
import BootSplash from 'react-native-bootsplash'
import PgProvide from './src/context/PgProvide'
import RootNavigator from './src/navigation/RootNavigator'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/utils/queryClient'
import { setRequestInterceptor } from './src/api/requestInterceptor'

const App = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true })
    setRequestInterceptor()
  }, [])

  return (
    <QueryClientProvider  client={queryClient}>
      <PgProvide>
        <RootNavigator />
      </PgProvide>
    </QueryClientProvider>

  )
}

export default App
