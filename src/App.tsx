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
    const { isLoggedIn } = useSelector((store: { ui: UISliceType }) => store.ui);
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Routes>
                    {isLoggedIn && (
                        <>
                            <Route path='/' element={<Home />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <Route path='/sign-up' element={<SignUp />} />
                            <Route path='*' element={<Navigate to='/sign-up' />} />
                        </>
                    )}
                </Routes>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
