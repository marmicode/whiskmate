import { env } from 'process';

export const isAuthEnabled = !(env.DISABLE_AUTH === 'true');
