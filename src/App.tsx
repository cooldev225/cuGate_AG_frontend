import { 
  CugatePage, AuthPage, CumarketPage, CuviewPage,
  CuradioPage, CutrackPage, PlaylistsPage,
  ImpressumPage, PrivacyPolicyPage, OurTeamPage,
  ProfilePage, SubscribePage, MembershipPage,
  CheckoutPage
} from "./views";
import AuthRoute from "./utils/AuthRoute";
import { BrowserRouter as Router, Routes , Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/JWTAuthContext";
import { DefaultLayout } from "./components";
import Root from "./components/Root";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DefaultLayout>
          <Routes>
            <Route element={<AuthRoute/>}>
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/profile/subscribe" element={<SubscribePage/>} />
              <Route path="/membership" element={<MembershipPage/>} />
              <Route path="/checkout" element={<CheckoutPage/>} />
            </Route>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<AuthPage page={0}/>} />
            <Route path="/register" element={<AuthPage  page={1}/>} />
            
            <Route path="/cugate" element={<CugatePage/>} />
            <Route path="/cumarket" element={<CumarketPage/>} />
            <Route path="/cuview" element={<CuviewPage/>} />
            <Route path="/curadio" element={<CuradioPage/>} />
            <Route path="/cutrack" element={<CutrackPage/>} />
            <Route path="/playlists" element={<PlaylistsPage/>} />
            <Route path="/our-team" element={<OurTeamPage/>} />
            <Route path="/impressum" element={<ImpressumPage/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
          </Routes>
        </DefaultLayout>
        
      </AuthProvider>
    </BrowserRouter>
  );
}