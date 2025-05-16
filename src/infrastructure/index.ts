import "reflect-metadata";
import { Container } from "./container";
import { HttpServer } from "./http/HttpServer";
import { Database } from "./database";
import { ApiRouter } from "./routes/ApiRouter";

let isShuttingDown = false;

export async function initServer(
    container: Container,
    host = "0.0.0.0",
    port = 8080,
    opts = {}
) {
    const server = container.resolve<HttpServer>("httpServer");
    const apiRouter = container.resolve<ApiRouter>("apiRouter");
    await server.init(opts);
    apiRouter.loadRoutes(server.fastify);
    await server.listen(host, port);
    console.log(server.fastify.printRoutes());
    return server;
}
async function initServices(container: Container) {
    console.info("Initing db connection");
    const db = container.resolve<Database>("db");
    await db.initConnection();
}
async function shutdown(container: Container) {
    if (!isShuttingDown) {
        isShuttingDown = true;
        console.info("Shutting down");
        await container.dispose();
        process.exit(0);
    }
}

async function start() {
    const container = new Container();
    await container.loadContainers();
    // for (const r in container.instance.registrations) console.log(r);
    await initServer(container);
    await initServices(container);

    process.on("SIGINT", () => shutdown(container));
    process.on("SIGTERM", () => shutdown(container));
    process.on("uncaughtException", (err) => {
        console.log("UncaughtException : %s", err.stack ? err.stack : err);
    });
}
start().catch(console.error);
