import { InteractionResponseType, InteractionType } from "discord-interactions";
import { CommandOptionTypes, CommandTypes, ContextTypes, IntegrationTypes } from "../lib/types/DiscordTypes";
import type { Request, Response } from "express";
import { getUser, searchUser } from "../lib/Revilium";
import { userNotFound, whois } from "../lib/Embed";

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
    const { data, member, user } = request.body;
    const currentUser = member?.user || user;

    data.options = data.options || [];
    const discord_user = data.options.find((_: { name: string }) => _.name === "discord_user");
    const username = data.options.find((_: { name: string }) => _.name === "username");
    const userid = data.options.find((_: { name: string }) => _.name === "userid");

    let reviliumUser;
    if (discord_user) {
        const search = await searchUser({ discord: discord_user.value });
        if (!search || search.length === 0)
            return response.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    embeds: userNotFound(),
                },
            });

        reviliumUser = await getUser(search[0].id);
    } else if (username) {
        const search = await searchUser({ username: username.value });
        if (!search || search.length === 0)
            return response.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    embeds: userNotFound(),
                },
            });

        reviliumUser = await getUser(search[0].id);
    } else if (userid) {
        reviliumUser = await getUser(userid.value);
    } else {
        const search = await searchUser({ discord: currentUser.id });
        if (!search || search.length === 0)
            return response.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    embeds: userNotFound(),
                },
            });

        reviliumUser = await getUser(search[0].id);
    }

    if (!reviliumUser)
        return response.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: userNotFound(),
            },
        });

    return response.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            embeds: whois(reviliumUser),
        },
    });
};
