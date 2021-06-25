import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { WhiskmateClient as _WhiskmateClient, WhiskmateDefinition as _WhiskmateDefinition } from './Whiskmate';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GetIngredientsRequest: MessageTypeDefinition
  GetIngredientsResponse: MessageTypeDefinition
  Ingredient: MessageTypeDefinition
  Whiskmate: SubtypeConstructor<typeof grpc.Client, _WhiskmateClient> & { service: _WhiskmateDefinition }
}

rpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  
}

export interface WhiskmateHandlers extends grpc.UntypedServiceImplementation {
  GetIngredients: grpc.handleUnaryCall<_GetIngredientsRequest__Output, _GetIngredientsResponse>;
  
}

export interface WhiskmateDefinition extends grpc.ServiceDefinition {
  GetIngredients: MethodDefinition<_GetIngredientsRequest, _GetIngredientsResponse, _GetIngredientsRequest__Output, _GetIngredientsResponse__Output>
}
