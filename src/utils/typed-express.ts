import type { Router, Request, Response } from 'express';
import type { RouteParameters } from 'express-serve-static-core';

type RequestHandler<PATH extends string, REQ_BODY, RES_BODY> = (
  req: Request<RouteParameters<PATH>, RES_BODY, REQ_BODY>,
  res: Response<RES_BODY>
) => Promise<void>;

/* @hack we need currying due to the following issue
 * https://github.com/microsoft/TypeScript/issues/16597
 * If REQ_BODY and RES_BODY are set then PATH becomes mandatory,
 * if we make it optional by defaulting to string then PATH inference
 * is broken. */

export const get =
  <RES_BODY>(router: Router) =>
  <PATH extends string>(
    path: PATH,
    ...handlers: RequestHandler<PATH, unknown, RES_BODY>[]
  ) => {
    return router.get(path, ...handlers);
  };

export const del =
  <RES_BODY>(router: Router) =>
  <PATH extends string>(
    path: PATH,
    ...handlers: RequestHandler<PATH, unknown, RES_BODY>[]
  ) => {
    return router.delete(path, ...handlers);
  };

export const post =
  <REQ_BODY, RES_BODY>(router: Router) =>
  <PATH extends string>(
    path: PATH,
    ...handlers: RequestHandler<PATH, REQ_BODY, RES_BODY>[]
  ) => {
    return router.post(path, ...handlers);
  };

export const patch =
  <REQ_BODY, RES_BODY>(router: Router) =>
  <PATH extends string>(
    path: PATH,
    ...handlers: RequestHandler<PATH, REQ_BODY, RES_BODY>[]
  ) => {
    return router.patch(path, ...handlers);
  };

export const put =
  <REQ_BODY, RES_BODY>(router: Router) =>
  <PATH extends string>(
    path: PATH,
    ...handlers: RequestHandler<PATH, REQ_BODY, RES_BODY>[]
  ) => {
    return router.put(path, ...handlers);
  };
