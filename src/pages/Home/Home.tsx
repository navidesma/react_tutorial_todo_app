import React from "react";
import { Button, Card, Grid } from "@mui/material";
import Main from "../../components/Main/Main";
import TableComponent from "../../components/TableComponent/TableComponent";
import { TodoType } from "../../interfaces";
import { Outlet } from "react-router-dom";
import useSendRequest from "../../util/useSendRequest";

export default function Home() {
    const axiosInstance = useSendRequest();
    const [todos, setTodos] = React.useState<TodoType[]>();

    React.useEffect(() => {
        const send = async () => {
            const response: TodoType[] = await axiosInstance.get("api/todos");

            setTodos(response);
        };

        send();
    }, []);

    if (!todos) return <></>;

    return (
        <Main>
            <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ padding: "1rem" }}>
                        <TableComponent
                            items={todos}
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
            <Outlet />
        </Main>
    );
}
