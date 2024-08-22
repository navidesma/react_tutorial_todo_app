import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import useInputValidator from "../../util/useInputValidator";
import useSendRequest from "../../util/useSendRequest";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { TodoType } from "../../interfaces";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateEditNote() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosInstanceWithNotification = useSendRequest({ showNotification: true });
    const axiosInstance = useSendRequest();
    const [todo, setTodo] = React.useState<TodoType>();

    const noteInputState = useInputValidator();

    React.useEffect(() => {
        if (!noteId) return;

        const send = async () => {
            const response: TodoType = await axiosInstance.get(`api/todos/${noteId}`);
            setTodo(response);
            noteInputState.setValue(response.title);
        };
        send();
    }, [noteId]);

    const handleClose = () => {
        navigate("/home");
    };

    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (!noteInputState.getIsValid()) return;

        const body = {
            title: noteInputState.value,
        };

        const send = async () => {
            if (todo) await axiosInstanceWithNotification.put(`api/todos/${todo.id}`, body);
            else await axiosInstanceWithNotification.post("api/todos", body);

            dispatch(uiActions.toggleReloadPage());
            navigate("/home");
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
            <DialogTitle>{todo ? "ویرایش یادداشت" : "ایجاد یادداشت جدید"}</DialogTitle>
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
                            {todo ? "ویرایش" : "ثبت"}
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
