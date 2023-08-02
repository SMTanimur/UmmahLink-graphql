import { AxiosError } from "axios";

export const getError = (error: unknown) => {
    if (error instanceof AxiosError) {
        return (error.response?.data || error) as Error;
    }
    return error as Error;
};
