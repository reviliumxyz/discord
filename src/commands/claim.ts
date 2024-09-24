import { InteractionResponseType, InteractionType } from "discord-interactions";
import { CommandTypes, ContextTypes, IntegrationTypes } from "../lib/types/DiscordTypes";
import type { Request, Response } from "express";

const ENTITLED_ROLES = ["1151296587474161695", "1256881583193853973"];

export const name = "claim";
export const type = InteractionType.APPLICATION_COMMAND;
export const metadata = {
    type: CommandTypes.CHAT_INPUT,
    name,
    description: "Claim your Revilium account, if you are entitled to one.",
    integration_types: [IntegrationTypes.GUILD_INSTALL],
    contexts: [ContextTypes.BOT_DM, ContextTypes.GUILD, ContextTypes.PRIVATE_CHANNEL],
    options: [],
};

export const run = async (request: Request, response: Response) => {
    const { member } = request.body;
    if (member.roles.find((_: string) => ENTITLED_ROLES.includes(_))) {
        return response.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        color: parseInt("FEE75C", 16),
                        description: "You are entitled to a Revilium account, but this feature isn't finished yet.",
                    },
                ],
            },
        });
    } else
        return response.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        color: parseInt("ED4245", 16),
                        description: "You are not entitled to a Revilium account.",
                    },
                ],
            },
        });
};
