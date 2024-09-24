import { InteractionResponseFlags, InteractionResponseType, type InteractionType } from "discord-interactions";
import type { Request, Response } from "express";
import DiscordRequest from "./DiscordRequest";

const COMMANDS: {
    name: string;
    type: InteractionType;
    metadata: any;
    run: Function;
}[] = [
    // prettier please
    await import("../commands/whois"),
    await import("../commands/lookup_user"),
    await import("../commands/claim"),
];

DiscordRequest({
    method: "PUT",
    path: `/applications/${process.env.DISCORD_ID}/commands`,
    data: JSON.stringify(COMMANDS.map((_) => _.metadata)),
});

export function handle(request: Request, response: Response) {
    const { data } = request.body;
    const command = COMMANDS.find((_) => _.name === data.name);
    if (!command)
        return response.send({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Unknown Command",
                flags: InteractionResponseFlags.EPHEMERAL,
            },
        });

    return command.run(request, response);
}
