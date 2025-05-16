import { FastifyRequest } from 'fastify';
import { AwilixResolver } from '../../resolver';

export class AuthMiddleware extends AwilixResolver {
  authenticate() {
    return async (req: FastifyRequest) => {
      try {
        const jwt = await req.jwtVerify();
        req.user = {
          id: jwt['id'],
          role: jwt['role'],
        };
      } catch (err) {
        const error = new Error('Unauthorized JWT');
        (error as any).statusCode = 401;
        throw error;
      }
    };
  }
}
