import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import { UISliceType } from "./store/ui-slice";
import { useSelector } from "react-redux";
import SignIn from "./pages/SignIn/SignIn";
import { Alert } from "@mui/material";
import Logout from "./pages/Logout/Logout";
import CreateEditNote from "./pages/CreateEditNote/CreateEditNote";
import Profile from "./pages/Profile/Profile";

const theme = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: ["Vazirmatn", "sans-serif"].join(","),
    },
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
    const { isLoggedIn, notification } = useSelector((store: { ui: UISliceType }) => store.ui);
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                {notification && (
                    <Alert
                        severity={notification.type}
                        variant='filled'
                        sx={{ marginTop: "0.5rem", position: "fixed" }}
                    >
                        {notification.message}
                    </Alert>
                )}
                <Routes>
                    {isLoggedIn && (
                        <>
                            <Route path='/home' element={<Home />}>
                                <Route path='/home/new-note' element={<CreateEditNote />} />
                                <Route
                                    path='/home/edit-note/:noteId'
                                    element={<CreateEditNote />}
                                />
                            </Route>
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='*' element={<Navigate to='/home' />} />
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <Route path='/sign-up' element={<SignUp />} />
                            <Route path='/sign-in' element={<SignIn />} />
                            <Route path='*' element={<Navigate to='/sign-in' />} />
                        </>
                    )}
                </Routes>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
