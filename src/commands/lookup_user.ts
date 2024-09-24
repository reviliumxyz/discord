import { InteractionResponseType, InteractionType } from "discord-interactions";
import { CommandTypes, ContextTypes, IntegrationTypes } from "../lib/types/DiscordTypes";
import type { Request, Response } from "express";

export const name = "Lookup user";
export const type = InteractionType.APPLICATION_COMMAND;
export const metadata = {
    type: CommandTypes.USER,
    name,
    description: "",
    integration_types: [IntegrationTypes.GUILD_INSTALL, IntegrationTypes.USER_INSTALL],
    contexts: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIVATE_CHANNEL],
    options: [],
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
