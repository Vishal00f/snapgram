import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import AuthContextProvider from './context/AuthContext.tsx'
const queryClient= new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </QueryClientProvider>
  </BrowserRouter>
)
