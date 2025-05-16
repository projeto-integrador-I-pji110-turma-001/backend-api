import { FastifyRequest } from 'fastify';
import { AwilixResolver } from '../../resolver';

export class AuthMiddleware extends AwilixResolver {
  authenticate({ jwt = false } = {}) {
    return async (req: FastifyRequest) => {
      if (jwt) {
        if (req.headers['authorization']) {
          return this.authenticateJWT(req);
        }
        const error = new Error('Unauthorized JWT');
        (error as any).statusCode = 401;
        throw error;
      }
    };
  }
  async authenticateJWT(req: FastifyRequest) {
    try {
      const jwt = await req.jwtVerify();
      req.user = {
        id: jwt['id'],
        role: jwt['role'],
      };
    } catch (err) {
      throw new Error('Unauthorized JWT');
    }
  }
}
