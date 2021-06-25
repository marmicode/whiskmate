// Original file: libs/backend/whiskmate-grpc-core/src/assets/whiskmate.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetIngredientsRequest as _GetIngredientsRequest, GetIngredientsRequest__Output as _GetIngredientsRequest__Output } from './GetIngredientsRequest';
import type { GetIngredientsResponse as _GetIngredientsResponse, GetIngredientsResponse__Output as _GetIngredientsResponse__Output } from './GetIngredientsResponse';

export interface WhiskmateClient extends grpc.Client {
  GetIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
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
