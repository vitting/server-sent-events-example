import {
  Application,
  Router,
  ServerSentEvent,
} from "https://deno.land/x/oak/mod.ts";
import { getNewsItems } from "./newsutil.ts";



const newsItems = await getNewsItems();


const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "SERVER SENT EVENT AT http://localhost:3000/sse";
});

router.get("/sse", (ctx) => {
  const headers = new Headers([["access-control-allow-origin", "*"]]);
  const target = ctx.sendEvents({ headers });

  target.addEventListener("close", (evt) => {
    console.log("CONNECTION CLOSED", evt);
  });

  setInterval(() => {
    const event = new ServerSentEvent("ping", { hello: "world" });
    target.dispatchEvent(event);
  }, 1000);
});

app.use(router.routes());
console.log("SERVER IS RUNNING: http://localhost:3000");
console.log("SERVER SEND EVENT IS RUNNING: http://localhost:3000/sse");
await app.listen({ port: 3000 });
