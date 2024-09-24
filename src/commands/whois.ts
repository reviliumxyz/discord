import { InteractionResponseType, InteractionType } from "discord-interactions";
import { CommandOptionTypes, CommandTypes, ContextTypes, IntegrationTypes } from "../lib/types/DiscordTypes";
import type { Request, Response } from "express";

export const name = "whois";
export const type = InteractionType.APPLICATION_COMMAND;
export const metadata = {
    type: CommandTypes.CHAT_INPUT,
    name,
    description: "Lookup a Revilium user. Defaults to yourself.",
    integration_types: [IntegrationTypes.GUILD_INSTALL, IntegrationTypes.USER_INSTALL],
    contexts: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIVATE_CHANNEL],
    options: [
        {
            type: CommandOptionTypes.USER,
            name: "discord_user",
            description: "Lookup by Discord account.",
        },
        {
            type: CommandOptionTypes.STRING,
            name: "username",
            description: "Lookup by username.",
        },
        {
            type: CommandOptionTypes.NUMBER,
            name: "userid",
            description: "Lookup by UserId.",
        },
    ],
};

export const run = async (request: Request, response: Response) => {
    return response.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: [
                {
                    color: parseInt("ED4245", 16),
                    description: "User not found.",
                },
            ],
        },
    });
};
