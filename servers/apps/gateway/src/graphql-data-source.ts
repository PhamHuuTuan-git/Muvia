import { GraphQLDataSourceProcessOptions, RemoteGraphQLDataSource } from "@apollo/gateway";
import { GraphQLDataSourceRequestKind } from "@apollo/gateway/dist/datasources/types";

export class GraphQLDataSource extends RemoteGraphQLDataSource {
    didReceiveResponse({ response, context }): typeof response {
        const cookies = response.http.headers?.raw()["set-cookie"] as string[] | null;

        if (cookies) {
            context?.req.res.append("set-cookie", cookies);
        }

        return response;
    }

    willSendRequest(params: GraphQLDataSourceProcessOptions) {
        const { request, context, kind } = params;

        if (kind === GraphQLDataSourceRequestKind.INCOMING_OPERATION && context?.req) {
            const cookie = context.req.headers['cookie'];
            if (cookie) {
                request.http?.headers?.set('Cookie', cookie);
            }
        }
    }
}