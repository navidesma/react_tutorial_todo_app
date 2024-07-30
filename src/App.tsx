import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

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
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Typography textAlign={"left"}>یک متن ساده</Typography>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
