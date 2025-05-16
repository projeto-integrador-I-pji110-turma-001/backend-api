import { FastifyInstance } from "fastify";
import { HealthRoutes } from "./HealthRoutes";
import { AwilixResolver } from "../resolver";

export class ApiRouter extends AwilixResolver {
    constructor(private healthRoutes: HealthRoutes) {
        super();
    }

    loadRoutes(fastify: FastifyInstance) {
        this.healthRoutes.routes(fastify);
    }
}
