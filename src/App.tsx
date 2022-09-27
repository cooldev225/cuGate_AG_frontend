import { CugatePage,AuthPage,InprocessPage } from "./views";
import AuthRoute from "./utils/AuthRoute";
import { BrowserRouter as Router, Routes , Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/JWTAuthContext";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthRoute/>}>
            
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<CugatePage/>} />
          <Route path="/inprocess" element={<InprocessPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}