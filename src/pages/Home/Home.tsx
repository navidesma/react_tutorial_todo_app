import { Button, Card, Grid } from "@mui/material";
import Main from "../../components/Main/Main";
import TableComponent from "../../components/TableComponent/TableComponent";
import { TodoType } from "../../interfaces";

const items: TodoType[] = [
    { id: 1, title: "felan", is_done: true },
    { id: 2, title: "bahman", is_done: false },
];

export default function Home() {
    return (
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
                                    content: () => <Button variant='contained'>ویرایش</Button>,
                                },
                            ]}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Main>
    );
}
