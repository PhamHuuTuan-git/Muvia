"use client";
import { authenSelectorUser } from '@/redux-toolkit/selector';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "@apollo/client";
import { CHECK_TOKEN } from "@/graphql/actions/authenActions/checktoken.action";
import { Spinner, addToast } from "@heroui/react";
import authenSlice from "@/redux-toolkit/slices/authen.slice";
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const userAuthen = useSelector(authenSelectorUser);
    const [checkTokenMutation, { loading, error, data }] = useMutation(CHECK_TOKEN);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkUserToken = async () => {
            if (userAuthen === null) {
                try {
                    setIsLoading(true);
                    const response = await checkTokenMutation();
                    console.log("response: ", response);
                    dispatch(authenSlice.actions.setUser(response.data.checkToken.user));
                    setIsLoading(false);
                } catch (err: any) {
                    if (err.networkError) {
                        addToast({
                            title: "Error",
                            description: `${err.networkError.message}`,
                            color: "danger",
                            radius: "sm",
                        })
                    } else {
                        addToast({
                            title: "Error",
                            description: `${err.message}`,
                            color: "danger",
                            radius: "sm",
                        })
                    }
                }
            }
        }
        checkUserToken();

    }, [userAuthen])
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider