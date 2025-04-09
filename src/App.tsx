import './App.css'
import LandingPage from "./pages/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import NotFound from "@/pages/NotFound.tsx";


const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard/*" element={<Dashboard />} />
                      {/*<Route path="/home" element={<Index />} />*/}
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      *<Route path="*" element={<NotFound />} />
                  </Routes>
              </BrowserRouter>
          </TooltipProvider>
      </QueryClientProvider>
  )
}

export default App