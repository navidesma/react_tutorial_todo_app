import { Box, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import useInputValidator from "../../util/useInputValidator";
import useSendRequest from "../../util/useSendRequest";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Link, useNavigate } from "react-router-dom";

interface SubmitType {
    username: string;
    password: string;
}

export default function SignIn() {
    const axiosInstance = useSendRequest();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userNameInputState = useInputValidator();
    const passwordInputState = useInputValidator();
    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (!(userNameInputState.getIsValid() && passwordInputState.getIsValid())) return;

        const body: SubmitType = {
            username: userNameInputState.value,
            password: passwordInputState.value,
        };

        const send = async () => {
            const response: { token: string } = await axiosInstance.post("auth/login", body);

            dispatch(uiActions.login({ token: response.token }));
            navigate("/");
        };

        send();
    };
    return (
        <Container maxWidth='md' sx={{ marginTop: "3rem" }}>
            <Card sx={{ borderRadius: "30px" }}>
                <Typography textAlign={"center"} variant='h4' p={2} fontWeight={"bold"}>
                    ورود
                </Typography>
                <Grid
                    component={"form"}
                    onSubmit={formSubmitHandler}
                    container
                    spacing={3}
                    display={"flex"}
                    justifyContent={"center"}
                    p={3}
                >
                    <Grid item xs={12} lg={4}>
                        <TextField
                            label='نام کاربری'
                            variant='outlined'
                            fullWidth
                            dir='ltr'
                            {...userNameInputState.props}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            label='رمز عبور'
                            variant='outlined'
                            fullWidth
                            type='password'
                            dir='ltr'
                            {...passwordInputState.props}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} lg={4}>
                        <Button type='submit' variant='contained' color='success' fullWidth>
                            ورود
                        </Button>
                    </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"center"} marginBottom={3}>
                    <Link to={"/sign-up"}>
                        <Button>حساب کاربری ندارید؟ حساب جدید بسازید</Button>
                    </Link>
                </Box>
            </Card>
        </Container>
    );
}
