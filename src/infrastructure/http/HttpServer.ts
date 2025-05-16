import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import { GlobalConfig } from "../../application/config/globalConfig";
import {
  corsPlugin,
  jwtPlugin,
  multipartPlugin,
  supportPlugin,
  swaggerPlugin,
  underPressurePlugin,
} from "./plugins";
import { AwilixResolver } from "../resolver";
import { Logger } from "pino";

export class HttpServer extends AwilixResolver {
  private server: FastifyInstance;

  constructor(private logger: Logger, private globalConfig: GlobalConfig) {
    super();
  }

  async init(opts: FastifyServerOptions = {}) {
    if (opts.logger === undefined) opts.logger = this.logger;
    this.server = fastify(opts);

    this.server.setErrorHandler(async (error, _request, reply) => {
      this.logger.error(error);
      reply.send(error);
    });

    await this.loadPlugins();

    return this.server;
  }

  async listen(host?: string, port?: number) {
    await this.server.listen({
      port: port ? port : this.globalConfig.port,
      host: host ? host : "0.0.0.0",
    });
    await this.server.ready();
    return this.server;
  }

  private async loadPlugins() {
    await this.server.register(corsPlugin);
    await this.server.register(jwtPlugin(this.globalConfig));
    await this.server.register(supportPlugin);
    await this.server.register(swaggerPlugin);
    await this.server.register(underPressurePlugin);
    await this.server.register(multipartPlugin);
  }

  get fastify() {
    return this.server;
  }

  async dispose() {
    if (this.server) {
      await this.server.close();
    }
    if (process.env.NODE_ENV !== "test") console.log("Http Server closed");
  }
}
