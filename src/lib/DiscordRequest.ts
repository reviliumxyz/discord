import { setTimeout } from "node:timers/promises";

export default async function DiscordRequest(options: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    data: BodyInit | null | undefined;
}) {
    const request = await fetch("https://discord.com/api/v10" + options.path, {
        method: options.method,
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: options.data,
    });

    const body = await request.json();
    if (body?.retry_after) {
        console.log("[Warning] Rate-limited on command init, retrying in", body?.retry_after, "seconds.");
        await setTimeout((body?.retry_after + 1.5) * 1000);
        return DiscordRequest(options);
    }

    return body;
}
