import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentPlayer = createParamDecorator(
  (data:string|undefined,context: ExecutionContext) => {
    const request= context.switchToHttp().getRequest();
    if(!data) return request.user;
    return request.user[data];
  }
);
