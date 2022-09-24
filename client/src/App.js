import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Listing from "./pages/Listing/Listing";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Reservation from "./pages/Reservation/Reservation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#97c680",
      },
      secondary: {
        main: "#feba88",
      },
      background: {
        default: "#fcfbfa",
      },
      text: {
        primary: "#1e1e2f",
      },
      error: {
        main: "#d22d2d",
      },
    },
    typography: {
      fontFamily: "Inter",
    },
  });

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
