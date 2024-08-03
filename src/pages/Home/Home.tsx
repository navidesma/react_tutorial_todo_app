import React from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import Main from "../../components/Main/Main";
import TableComponent from "../../components/TableComponent/TableComponent";
import { TodoType } from "../../interfaces";
import { Link, Outlet } from "react-router-dom";
import useSendRequest from "../../util/useSendRequest";
import { UISliceType } from "../../store/ui-slice";
import { useSelector } from "react-redux";

export default function Home() {
    const { reloadCounter } = useSelector((store: { ui: UISliceType }) => store.ui);
    const axiosInstance = useSendRequest();
    const [todos, setTodos] = React.useState<TodoType[]>();

    React.useEffect(() => {
        const send = async () => {
            const response: TodoType[] = await axiosInstance.get("api/todos");

            setTodos(response);
        };

        send();
    }, [reloadCounter]);

    if (!todos) return <></>;

    return (
        <Main>
            <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ padding: "1rem" }}>
                        {todos.length > 0 ? (
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
                                        content: (item) => (
                                            <Button
                                                variant='contained'
                                                component={Link}
                                                to={`/home/edit-note/${item.id}`}
                                            >
                                                ویرایش
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                        ) : (
                            <>
                                <Typography variant='h4'>هیچ یادداشتی تعریف نشده</Typography>
                                <Button
                                    component={Link}
                                    to='/home/new-note'
                                    sx={{ marginTop: "1rem" }}
                                >
                                    ایجاد یادداشت جدید
                                </Button>
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <Outlet />
        </Main>
    );
}
