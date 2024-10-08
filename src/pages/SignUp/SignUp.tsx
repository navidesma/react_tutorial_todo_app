import { Box, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import useInputValidator from "../../util/useInputValidator";
import useSendRequest from "../../util/useSendRequest";
import { Link, useNavigate } from "react-router-dom";

interface SubmitType {
    username: string;
    lastName: string;
    firstName: string;
    password: string;
}

export default function SignUp() {
    const axiosInstance = useSendRequest({ showNotification: true });
    const navigate = useNavigate();

    const nameInputState = useInputValidator();
    const lastNameInputState = useInputValidator();
    const userNameInputState = useInputValidator();
    const passwordInputState = useInputValidator();
    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (
            !(
                nameInputState.getIsValid() &&
                lastNameInputState.getIsValid() &&
                userNameInputState.getIsValid() &&
                passwordInputState.getIsValid()
            )
        )
            return;

        const body: SubmitType = {
            username: userNameInputState.value,
            firstName: nameInputState.value,
            lastName: lastNameInputState.value,
            password: passwordInputState.value,
        };

        const send = async () => {
            await axiosInstance.post("auth/register", body);

            navigate("/sign-in");
        };

        send();
    };
    return (
        <Container maxWidth='md' sx={{ marginTop: "3rem" }}>
            <Card sx={{ borderRadius: "30px" }}>
                <Typography textAlign={"center"} variant='h4' p={2} fontWeight={"bold"}>
                    ثبت کاربر
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
                            label='نام'
                            variant='outlined'
                            fullWidth
                            {...nameInputState.props}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            label='نام خانوادگی'
                            variant='outlined'
                            fullWidth
                            {...lastNameInputState.props}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
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
                            ثبت کاربر جدید
                        </Button>
                    </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"center"} marginBottom={3}>
                    <Button component={Link} to='/sign-in'>
                        حساب کاربری دارید؟ وارد شوید
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}
