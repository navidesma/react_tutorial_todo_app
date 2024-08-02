import { useDispatch, useSelector } from "react-redux";
import { uiActions, UISliceType } from "../store/ui-slice";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_URL = "http://localhost:8000/";

export default function useSendRequest({
    showNotification,
    sendAsFormData,
}: {
    showNotification?: boolean;
    sendAsFormData?: boolean;
} = {}) {
    const { token } = useSelector((store: { ui: UISliceType }) => store.ui);
    const dispatch = useDispatch();

    const requestConfig = (config: InternalAxiosRequestConfig) => {
        config.headers["Content-Type"] = sendAsFormData
            ? "multipart/form-data"
            : "application/json";

        config.headers.Authorization = token ? `Bearer ${token}` : "";

        return config;
    };

    const onSuccess = (response: AxiosResponse) => {
        if (showNotification) {
            dispatch(
                uiActions.showNotification({
                    type: "success",
                    message: "موفقیت آمیز",
                }),
            );
        }

        return response.data;
    };

    const onFailure = (error: AxiosError) => {
        if (error) {
            if (error.response?.status === 401) {
                dispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: "احراز هویت نشده",
                    }),
                );

                dispatch(uiActions.logout());
                return;
            }

            dispatch(
                uiActions.showNotification({
                    type: "error",
                    message: "مقدار ورودی نادرست است",
                }),
            );
        }
    };

    const axiosInstance = axios.create({ baseURL: API_URL });

    axiosInstance.interceptors.request.use(requestConfig);
    axiosInstance.interceptors.response.use(onSuccess, onFailure);

    return axiosInstance;
}
