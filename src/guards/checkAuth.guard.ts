import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { JwtHelper } from 'src/helpers';
import { PROTECTED_KEY } from 'src/decorators';
import { UserRoles } from 'src/modules/users/enum';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtHelper: JwtHelper,
  ) {}

  canActivate(
  context: ExecutionContext,
): boolean | Promise<boolean> | Observable<boolean> {
  const isProtected = this.reflector.getAllAndOverride<boolean>(
    PROTECTED_KEY,
    [context.getHandler(), context.getClass()],
  );

  const ctx = context.switchToHttp();
  const request = ctx.getRequest<
    Request & { role?: string; userId?: number }
  >();

  if (!isProtected) {
    request.role = UserRoles.USER;
    return true;
  }

  const token: string = request.headers['authorization']?.split(' ')[1];
  if (!token || !request.headers['authorization'].startsWith('Bearer')) {
    throw new BadRequestException('give bearer token');
  }

  const accessToken = token.trim();

  if (!accessToken) {
    throw new BadRequestException('give access token');
  }

  try {
    const payload = this.jwtHelper.verifyToken(accessToken);
    request.role = payload?.role;
    request.userId = payload?.id;
    return true; 
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ForbiddenException('Token expired time');
    }

    if (error instanceof JsonWebTokenError) {
      throw new ConflictException('Token format not true given or Token');
    }

    throw new InternalServerErrorException('Internal Server Error');
  }
}

}
