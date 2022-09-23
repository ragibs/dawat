import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import NotFound from "./pages/NotFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Listing from "./pages/Listing/Listing";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Reservation from "./pages/Reservation/Reservation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/search/:cityId" element={<Search />} />
            <Route
              path="/reservation"
              element={
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              }
            />
            <Route path="/:listingId" element={<Listing />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
