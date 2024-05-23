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
import DashboardLayout from "./Dashboard/component/dashboardLayout";
import Overview from "./Dashboard/pages/Overview";
import UserManagement from "./Dashboard/pages/UserManagement";
import AdminManagement from "./Dashboard/pages/AdminManagement";
import PostManagement from "./Dashboard/pages/PostManagement";
import ReportManagement from "./Dashboard/pages/ReportManagement";
import SocialMedia from "./Dashboard/pages/SocialMedia";
import NotificationAlert from "./Dashboard/pages/NotificationAlert";
import SystemSecurity from "./Dashboard/pages/SystemSecurity";
import MessagePage from "./pages/messagePage/messagepage";
import AnimatedLanding from "./components/landingpage/animation";
import ProtectedRoute from "./components/States/authIntegration/protectedRoute";
import Unauthorised from "./components/unauthorised";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          {/* use <ProtectedRoute path="/admin" component={AdminPage} roles={['admin']} /> for protectedroute */}
            
            {/* <Route path="/eachpost" element={<EachPostPage />} /> */}
            <Route path="/landing" element={<AnimatedLanding />} />
            <Route element={<ProfileLayout />}>
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/myposts" element={<MyPost />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/favoritelist" element={<FavoritePost />} />
              <Route path="/security" element={<PasswordSecurity />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
            <Route path="/comment" element={<CommentModal />} />
            <Route element={<DashboardLayout />}>
              <Route path="/overview" element={<Overview />} />
              {/* <Route path="/usermanagement" element={<UserManagement />} /> */}
              <Route path="/adminmanagement" element={<AdminManagement />} />
              <Route path="/postmanagement" element={<PostManagement />} />
              <Route path="/socialmedia" element={<SocialMedia />} />
              <Route path="/reportmanagement" element={<ReportManagement />} />
              <Route path="/notificationalert" element={<NotificationAlert />}
              />
              <Route path="/systemsecurity" element={<SystemSecurity />} />
              <Route path="/systemsetting" element={<SystemSecurity />} />
            </Route>
            
            <Route path="/unauthorised" element={<Unauthorised />} />
       
{/* after protected */}

{/* any user */}

<Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/feedpage" replace />} />
              <Route path="/feedpage" element={<FeedPage />} />
              <Route path="/authpage" element={<AuthPage />} />
            </Route>
{/* regular user and admin */}

<Route element={<ProtectedRoute allowedRoles={[1,2]} />}>
<Route path="/createpost" element={<CreatePost />} />
<Route path="/eachpost" element={<EachPostPage/>} />
</Route>

{/* only admin */}
<Route element={<ProtectedRoute allowedRoles={[2]} />}>

</Route>

{/* the 3 users */}
<Route element={<ProtectedRoute allowedRoles={[1,2,3]} />}>
<Route path="/message" element={<MessagePage />} />
</Route>

{/* admin and superAdmin */}
<Route element={<ProtectedRoute allowedRoles={[2,3]} />}>
<Route element={<DashboardLayout />}>
              <Route path="/overview" element={<Overview />} />
              <Route path="/postmanagement" element={<PostManagement />} />
              <Route path="/socialmedia" element={<SocialMedia />} />
              <Route path="/reportmanagement" element={<ReportManagement />} />
              <Route path="/notificationalert" element={<NotificationAlert/>}
              />
              <Route path="/systemsecurity" element={<SystemSecurity />} />
              <Route path="/systemsetting" element={<SystemSecurity />} />
            </Route>
</Route>

{/* superAdmin */}
<Route element={<ProtectedRoute allowedRoles={[3]} />}>
<Route path="/adminmanagement" element={<AdminManagement />} />
</Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
