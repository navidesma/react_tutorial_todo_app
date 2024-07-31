import { Button, Card, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import TableComponent from "./components/TableComponent/TableComponent";
import Main from "./components/Main/Main";
import { TodoType } from "./interfaces";

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

const items: TodoType[] = [
    { id: 1, title: "felan", is_done: true },
    { id: 2, title: "bahman", is_done: false },
];

function App() {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Main>
                    <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                        <Grid item xs={12} lg={6}>
                            <Card sx={{ padding: "1rem" }}>
                                <TableComponent
                                    items={items}
                                    columns={[
                                        {
                                            label: "متن یادداشت",
                                            content: (item) => <>{item.title}</>,
                                        },
                                        {
                                            label: "به اتمام رسیده",
                                            content: (item) => <>{item.is_done ? "بله" : "خیر"}</>,
                                        },
                                        {
                                            label: "",
                                            content: () => (
                                                <Button variant='contained'>ویرایش</Button>
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Main>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
