import { CugatePage,AuthPage, CumarketPage, CuviewPage, CuradioPage, CutrackPage, PlaylistsPage } from "./views";
import AuthRoute from "./utils/AuthRoute";
import { BrowserRouter as Router, Routes , Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/JWTAuthContext";
import { DefaultLayout } from "./components";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DefaultLayout>
          <Routes>
            <Route element={<AuthRoute/>}>
              
            </Route>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<CugatePage/>} />
            <Route path="/cumarket" element={<CumarketPage/>} />
            <Route path="/cuview" element={<CuviewPage/>} />
            <Route path="/curadio" element={<CuradioPage/>} />
            <Route path="/cutrack" element={<CutrackPage/>} />
            <Route path="/playlists" element={<PlaylistsPage/>} />
          </Routes>
        </DefaultLayout>
        
      </AuthProvider>
    </BrowserRouter>
  );
}