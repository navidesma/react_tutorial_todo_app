import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import useInputValidator from "../../util/useInputValidator";
import useSendRequest from "../../util/useSendRequest";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function NewNote() {
    const navigate = useNavigate();
    const axiosInstance = useSendRequest();

    const noteInputState = useInputValidator();

    const handleClose = () => {
        navigate("/home");
    };

    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (!noteInputState.getIsValid()) return;

        const send = async () => {
            await axiosInstance.post("/api/todos", {
                title: noteInputState.value,
            });

            navigate("/home", { replace: true });
            window.location.reload();
        };

        send();
    };

    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle>ایجاد یادداشت جدید</DialogTitle>
            <DialogContent>
                <Grid
                    component='form'
                    container
                    spacing={3}
                    display={"flex"}
                    justifyContent={"center"}
                    padding={5}
                    onSubmit={formSubmitHandler}
                >
                    <Grid item xs={12}>
                        <TextField
                            label='متن یادداشت'
                            multiline
                            rows={4}
                            fullWidth
                            {...noteInputState.props}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' color='success' type='submit'>
                            ثبت
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' color='error'>
                    بستن
                </Button>
            </DialogActions>
        </Dialog>
    );
}
