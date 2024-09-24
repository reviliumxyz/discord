import express from "express";
import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from "discord-interactions";
import * as ApplicationCommandHandler from "./lib/ApplicationCommandHandler";
import * as ComponentHandler from "./lib/ComponentHandler";

if (!process?.env?.DISCORD_PUBKEY) throw new Error("Missing pubkey");

const app = express();
app.use(verifyKeyMiddleware(process.env.DISCORD_PUBKEY));

app.post("/", (request, response) => {
    const { type }: { type: InteractionType } = request.body;

    if (type === InteractionType.PING) {
        return response.send({ type: InteractionResponseType.PONG });
    } else if (type === InteractionType.APPLICATION_COMMAND) {
        return ApplicationCommandHandler.handle(request, response);
    } else if (type === InteractionType.MESSAGE_COMPONENT) {
        return ComponentHandler.handle(request, response);
    } else {
        return response.status(400).end("Bad Request");
    }
});

app.all("*", (request, response) => response.status(404).end("Not Found"));

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port", process.env.PORT || 3000);
});
