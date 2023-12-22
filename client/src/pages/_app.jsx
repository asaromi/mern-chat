import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from '@/pages'
import ChatroomDetail from '@/pages/chatrooms/_code'
import '@/assets/styles/index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useEffect} from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  // how to get params from url
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path="/chatrooms/:code" element={<ChatroomDetail />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
