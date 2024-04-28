import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./assets/theme";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/authPage";
import FeedPage from "./pages/HomePage/feedPage";
import EachPostPage from "./pages/EachPost/eachPostPage";
import ProfileLayout from "./pages/Profile/component/layout";
import EditProfile from "./pages/Profile/editProfile";
import MyPost from "./pages/Profile/component/myPost";
import { Notification } from "./pages/Profile/Notification";
import FavoritePost from "./pages/Profile/favoritePost";
import PasswordSecurity from "./pages/Profile/PasswordAndSecurity";
import Setting from "./pages/Profile/Setting";
import CreatePost from "./pages/createPost/createPost";
import CommentModal from "./pages/HomePage/component/feedComment";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/feedpage" replace />} />
              <Route path="/feedpage" element={<FeedPage />} />
              
              <Route path="/authpage" element={<AuthPage />} />
            </Route>
            <Route path="/eachpost" element={<EachPostPage />} />
            <Route element={<ProfileLayout />}>
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/myposts" element={<MyPost />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/favoritelist" element={<FavoritePost />} />
              <Route path="/security" element={<PasswordSecurity />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/comment" element={<CommentModal />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
