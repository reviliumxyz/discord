import { InteractionResponseType, InteractionType } from "discord-interactions";
import { CommandTypes, ContextTypes, IntegrationTypes } from "../lib/types/DiscordTypes";
import type { Request, Response } from "express";
import { getUser, searchUser } from "../lib/Revilium";
import { userNotFound, whois } from "../lib/Embed";
import { ERROR_COLOR } from "../lib/Config";

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
    const { data } = request.body;
    const target_id = data.target_id;

    const search = await searchUser({ discord: target_id });
    if (!search || search.length === 0)
        return response.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: userNotFound(),
            },
        });

    const user = await getUser(search[0].id);
    return response.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: whois(user),
        },
    });
};
