import express from 'express';
import cookieParser from 'cookie-parser';
import z from 'zod';
import { v4 as uuid } from 'uuid';
import { AUTH_COOKIE, UserIdentity } from './types';

const authSchema = z.object({
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(25, 'Username must not exceed 25 characters!'),
});

export function setupAuth(app: express.Express) {
  app.use(cookieParser());
  app.use(express.json());
  app.use('/auth', (req, res, next) => {
    if (req.method === 'POST') {
      const { success, data, error } = authSchema.safeParse(req.body);
      if (!success) {
        res.status(400).json({
          errors: error.issues.map(({ message }) => message),
        });
        return;
      }

      const { userName } = data;
      const identity: UserIdentity = {
        userId: uuid(),
        userName,
      };
      const encodedIdentity = Buffer.from(JSON.stringify(identity)).toString(
        'base64'
      );
      res.cookie(AUTH_COOKIE, encodedIdentity, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(405);
    }
  });
}
