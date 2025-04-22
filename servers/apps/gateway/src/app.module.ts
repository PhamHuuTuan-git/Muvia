import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigService, ConfigModule } from '@nestjs/config';

// Chúng ta dùng Federation, Apollo Federation là một kiến trúc cho phép bạn chia nhỏ GraphQL 
// thành nhiều service con (subgraphs), rồi kết hợp chúng lại thành một schema duy nhất ở Gateway.
// Vì nếu bạn làm project lớn, việc gom hết schema, logic, resolver... vào một GraphQL server to đùng (monolith) 
// sẽ rất khó bảo trì và mở rộng.

// Và chúng ta dùng ApolloGatewayDriver để gộp nhiều subgraph lại, nó không có schema, chỉ có route
// và nó không xử lý các logic trực tiếp

// Chỉ cần 1 nơi có ApolloFederationDriver, thì nó sẽ tự động gom các subgraph từ các nơi khác có 
// ApolloFederationDriver thành 1 supergraph
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/gateway/.env',
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver, // 	Driver đặc biệt cho Federation Gateway (giao tiếp với nhiều subgraphs).

      gateway: {
        supergraphSdl: new IntrospectAndCompose({ // Tự động lấy schema từ các subgraph services thông qua introspection, rồi compose thành 1 supergraph.
          subgraphs: [
            { name: 'user', url: 'http://localhost:4001/graphql' }
          ], // Nơi khai báo các subgraph (service con) cần được gom lại thành supergraph

        })
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
