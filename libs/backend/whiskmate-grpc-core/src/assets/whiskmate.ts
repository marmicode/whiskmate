// Original file: libs/backend/whiskmate-grpc-core/src/assets/whiskmate.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetIngredientsRequest as _GetIngredientsRequest, GetIngredientsRequest__Output as _GetIngredientsRequest__Output } from './GetIngredientsRequest';
import type { GetIngredientsResponse as _GetIngredientsResponse, GetIngredientsResponse__Output as _GetIngredientsResponse__Output } from './GetIngredientsResponse';
import type { GetRecipesRequest as _GetRecipesRequest, GetRecipesRequest__Output as _GetRecipesRequest__Output } from './GetRecipesRequest';
import type { GetRecipesResponse as _GetRecipesResponse, GetRecipesResponse__Output as _GetRecipesResponse__Output } from './GetRecipesResponse';

export interface WhiskmateClient extends grpc.Client {
  GetIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  GetIngredients(argument: _GetIngredientsRequest, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  getIngredients(argument: _GetIngredientsRequest, callback: (error?: grpc.ServiceError, result?: _GetIngredientsResponse__Output) => void): grpc.ClientUnaryCall;
  
  GetRecipes(argument: _GetRecipesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  GetRecipes(argument: _GetRecipesRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  GetRecipes(argument: _GetRecipesRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  GetRecipes(argument: _GetRecipesRequest, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  getRecipes(argument: _GetRecipesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  getRecipes(argument: _GetRecipesRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  getRecipes(argument: _GetRecipesRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  getRecipes(argument: _GetRecipesRequest, callback: (error?: grpc.ServiceError, result?: _GetRecipesResponse__Output) => void): grpc.ClientUnaryCall;
  
}

export interface WhiskmateHandlers extends grpc.UntypedServiceImplementation {
  GetIngredients: grpc.handleUnaryCall<_GetIngredientsRequest__Output, _GetIngredientsResponse>;
  
  GetRecipes: grpc.handleUnaryCall<_GetRecipesRequest__Output, _GetRecipesResponse>;
  
}

export interface WhiskmateDefinition extends grpc.ServiceDefinition {
  GetIngredients: MethodDefinition<_GetIngredientsRequest, _GetIngredientsResponse, _GetIngredientsRequest__Output, _GetIngredientsResponse__Output>
  GetRecipes: MethodDefinition<_GetRecipesRequest, _GetRecipesResponse, _GetRecipesRequest__Output, _GetRecipesResponse__Output>
}
