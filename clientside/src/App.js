import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import {useSelector} from 'react-redux';
import { themeSettings } from "./assets/theme";
import {BrowserRouter,Navigate,Route,Router,Routes} from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/authPage";
import FeedPage from "./pages/HomePage/feedPage";
import EachPostPage from "./pages/EachPost/eachPostPage";
function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route element={<Layout />}>
<Route path="/" element={<Navigate to="/feedpage" replace/>}/>
<Route path="/feedpage" element={<FeedPage/>}/>
<Route path="/eachpost" element={<EachPostPage/>}/>
<Route path="/authpage" element={<AuthPage/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
