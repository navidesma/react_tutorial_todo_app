import React from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Main from "../../components/Main/Main";
import TableComponent from "../../components/TableComponent/TableComponent";
import { TodoType } from "../../interfaces";
import { Link, Outlet } from "react-router-dom";
import useSendRequest from "../../util/useSendRequest";
import { uiActions, UISliceType } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const { reloadCounter } = useSelector((store: { ui: UISliceType }) => store.ui);
    const axiosInstance = useSendRequest();
    const axiosInstanceWithNotification = useSendRequest({ showNotification: true });
    const [todos, setTodos] = React.useState<TodoType[]>();

    const dispatch = useDispatch();

    React.useEffect(() => {
        const send = async () => {
            const response: TodoType[] = await axiosInstance.get("api/todos");

            setTodos(response);
        };

        send();
    }, [reloadCounter]);

    const finishTodo = async (id: number) => {
        await axiosInstanceWithNotification.put(`api/todos/${id}`, { is_done: true });
        dispatch(uiActions.toggleReloadPage());
    };
    const unFinishTodo = async (id: number) => {
        await axiosInstanceWithNotification.put(`api/todos/${id}`, { is_done: false });
        dispatch(uiActions.toggleReloadPage());
    };
    const deleteTodo = async (id: number) => {
        await axiosInstanceWithNotification.delete(`api/todos/${id}`);
        dispatch(uiActions.toggleReloadPage());
    };

    if (!todos) return <></>;

    const doneTodos = todos.filter((todo) => todo.is_done === true);
    const unDoneTodos = todos.filter((todo) => todo.is_done === false);

    return (
        <Main>
            <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ padding: "1rem" }}>
                        {todos.length === 0 && (
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
                        {unDoneTodos.length > 0 && (
                            <>
                                <Typography variant='h6' mb={2}>
                                    وظایف به اتمام نرسیده
                                </Typography>
                                <TableComponent
                                    items={unDoneTodos}
                                    columns={[
                                        {
                                            label: "متن یادداشت",
                                            content: (item) => <>{item.title}</>,
                                        },
                                        {
                                            label: "",
                                            content: (item) => (
                                                <Button
                                                    variant='outlined'
                                                    color='success'
                                                    onClick={() => finishTodo(item.id)}
                                                >
                                                    ثبت به عنوان به پایان رسیده
                                                </Button>
                                            ),
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
                            </>
                        )}
                        <Box mt={2} mb={2}></Box>
                        {doneTodos.length > 0 && (
                            <>
                                <Typography variant='h6' mb={2}>
                                    وظایف به اتمام رسیده
                                </Typography>
                                <TableComponent
                                    items={doneTodos}
                                    columns={[
                                        {
                                            label: "متن یادداشت",
                                            content: (item) => <>{item.title}</>,
                                        },
                                        {
                                            label: "",
                                            content: (item) => (
                                                <Button
                                                    variant='outlined'
                                                    color='warning'
                                                    onClick={() => unFinishTodo(item.id)}
                                                >
                                                    ثبت به عنوان به پایان نرسیده
                                                </Button>
                                            ),
                                        },
                                        {
                                            label: "",
                                            content: (item) => (
                                                <Button
                                                    variant='outlined'
                                                    color='error'
                                                    onClick={() => deleteTodo(item.id)}
                                                >
                                                    حذف
                                                </Button>
                                            ),
                                        },
                                    ]}
                                />
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <Outlet />
        </Main>
    );
}
