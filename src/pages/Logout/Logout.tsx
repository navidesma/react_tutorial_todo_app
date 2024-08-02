import React from "react";

import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function Logout() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(uiActions.logout());
    }, []);

    return <></>;
}
