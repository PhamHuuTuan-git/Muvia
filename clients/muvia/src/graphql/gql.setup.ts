import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, ServerError, gql } from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { fromPromise } from '@apollo/client/link/utils';
import routing from "@/utils/routing";

const backendUrl = process.env.NEXT_PUBLIC_SERVER_URI;
// Hàm làm mới token
const refreshToken = async () => {
    const refreshClient = new ApolloClient({
        link: new HttpLink({ uri: backendUrl, credentials: 'include' }),
        cache: new InMemoryCache(),
    });

    const { data } = await refreshClient.mutate({
        mutation: gql`
        mutation RefreshToken {
          refreshToken {
            accessToken
          }
        }
      `,
    });

    return data.refreshToken.accessToken;
};

// Link xử lý lỗi
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (err.extensions?.code === 'UNAUTHENTICATED') {
                const isRetry = operation.getContext()._retry;

                if (!isRetry) {
                    operation.setContext({ _retry: true }); // Đánh dấu để tránh lặp vô hạn

                    return fromPromise(
                        refreshToken()
                            .then((newAccessToken) => {
                                console.log('Refreshed token:', newAccessToken);

                                // Lưu access token mới
                                localStorage.setItem('access_token', newAccessToken);

                                // Cập nhật header cho request ban đầu
                                operation.setContext(({ headers = {} }) => ({
                                    headers: {
                                        ...headers,
                                        Authorization: `Bearer ${newAccessToken}`,
                                    },
                                }));

                                return forward(operation);
                            })
                            .catch((refreshError) => {
                                console.log('Refresh token failed:', refreshError);

                                // Đăng xuất
                                const logoutClient = new ApolloClient({
                                    link: new HttpLink({
                                        uri: backendUrl,
                                        credentials: 'include',
                                    }),
                                    cache: new InMemoryCache(),
                                });

                                return logoutClient
                                    .mutate({
                                        mutation: gql`
                          mutation Logout {
                            logout
                          }
                        `,
                                    })
                                    .then(() => {
                                        // Xóa access token
                                        localStorage.removeItem('access_token');

                                        // Chuyển hướng đến trang đăng nhập
                                        // window.location.href = `${routing.login}`;

                                        throw new Error('Yêu cầu đăng nhập');
                                    });
                            })
                    ).flatMap((result) => result);
                }
            }
        }
    }

    // Trả về lỗi nếu không phải UNAUTHENTICATED
    return forward(operation);
});

  // const operationName = operation.operationName;
    
    // // if (
    // //     operationName === 'login' ||
    // //     operationName === 'refreshToken' ||
    // //     operationName === 'register'
    // //   ) {
    // //     return { headers };
    // //   }
const authLink = setContext((operation, { headers }) => {
    const token = localStorage.getItem('access_token');
    // console.log("authlink token: ", token)
  
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// HTTP Link
const httpLink = new HttpLink({
    uri: backendUrl,
    credentials: 'include', // Để gửi cookie (refresh_token)
});

// Retry Link để thử lại request
const retryLink = new RetryLink({
    attempts: {
        max: 2, // Thử lại tối đa 2 lần
        retryIf: (error) =>
            !!error && error.graphQLErrors?.some((err: any) => err.extensions?.code === 'UNAUTHENTICATED'),
    },
});

const link = from([ errorLink,authLink , retryLink, httpLink]);
export const graphqlClient = new ApolloClient({
    // link: new HttpLink({
    //     uri: process.env.NEXT_PUBLIC_SERVER_URI,
    //     credentials: 'include', // Dùng để nhận cookie
    // }),
    link,
    cache: new InMemoryCache(),

})