import { NextFunction, Request, Response } from 'express';

export interface RequestAuthInfo {
  authInfo: {
    scope?: string[];
  };
}

export type Guard<REQ extends Request> = (
  req: REQ & RequestAuthInfo
) => boolean;

export const withGuard =
  <REQ extends Request, RES extends Response>(guard: Guard<REQ>) =>
  (req: REQ, res: RES, next: NextFunction) => {
    if (!guard(req as REQ & RequestAuthInfo)) {
      res.status(403);
      res.send({
        type: 'https://whiskmate.io/problems/forbidden',
        title: 'Forbidden',
      });
      return;
    }

    next();
  };

export const hasScope =
  <REQ extends Request>(scope: string): Guard<REQ> =>
  (req) =>
    req.authInfo.scope?.includes(scope) === true;

export const withScope = <REQ extends Request, RES extends Response>(
  scope: string
) => withGuard<REQ, RES>(hasScope(scope));
