/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { logger } from './logger';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Something went wrong';
  let errors: any[] = [];
  logger.error(err);
  // ✅ ZOD ERROR HANDLING
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }));
  }
  // ✅ JWT ERROR HANDLING
  if (err instanceof TokenExpiredError) {
    return res.send(
      `
    <html>
      <head>
        <style>
          body { font-family: Arial; background: #f8d7da; color: #721c24; text-align: center; padding: 50px; }
          .error-box { border: 1px solid #f5c6cb; padding: 20px; border-radius: 5px; background: #f8d7da; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="error-box">
          <h1>Error!</h1>
          <p>${message}oooooooooooooooooooo</p>
        </div>
      </body>
    </html>
  `
    )
    // return res.redirect(`${process.env.CLIENT_URL}/error?message=${message}`);
  }

  // JWT invalid token
  if (err instanceof JsonWebTokenError) {
    return res.send(
      `
    <html>
      <head>
        <style>
          body { font-family: Arial; background: #f8d7da; color: #721c24; text-align: center; padding: 50px; }
          .error-box { border: 1px solid #f5c6cb; padding: 20px; border-radius: 5px; background: #f8d7da; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="error-box">
          <h1>Error!</h1>
          <p>${message}</p>
        </div>
      </body>
    </html>
  `
    )
    // return res.redirect(`${process.env.CLIENT_URL}/error?message=${message}`);
  }
  // ✅ PRISMA ERROR HANDLING
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Known Prisma errors, like unique constraint failed
    statusCode = 400;
    message = `Prisma Error: ${err.message}`;
    errors.push({
      code: err.code,
      meta: err.meta,
      target: err.meta?.target,
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Validation error
    statusCode = 400;
    message = `Prisma Validation Error: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = `Prisma Unknown Error: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = `Prisma Panic Error: ${err.message}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length ? errors : undefined,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
