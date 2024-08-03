import React from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import Main from "../../components/Main/Main";
import useInputValidator from "../../util/useInputValidator";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, UISliceType } from "../../store/ui-slice";
import useSendRequest from "../../util/useSendRequest";

interface EditUserType {
    firstName: string;
    lastName: string;
}

export default function Profile() {
    const { firstName, lastName } = useSelector((store: { ui: UISliceType }) => store.ui);
    const nameInputState = useInputValidator();
    const lastNameInputState = useInputValidator();

    const axiosInstance = useSendRequest();
    const dispatch = useDispatch();

    React.useEffect(() => {
        nameInputState.setValue(firstName as string);
        lastNameInputState.setValue(lastName!);
    }, []);

    const formSubmitHandler: React.FormEventHandler = async (event) => {
        event.preventDefault();

        const body: EditUserType = {
            firstName: nameInputState.value,
            lastName: lastNameInputState.value,
        };

        const response: EditUserType = await axiosInstance.put("api/user/edit", body);

        dispatch(uiActions.setUserInfo(response));
    };

    return (
        <Main>
            <Card>
                <Grid
                    component={"form"}
                    container
                    spacing={3}
                    display={"flex"}
                    justifyContent={"center"}
                    p={3}
                    onSubmit={formSubmitHandler}
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
                        <Button type='submit' variant='contained' color='success' fullWidth>
                            ویرایش
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Main>
    );
}
