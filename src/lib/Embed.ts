function dateToTimestamp(date: Date) {
    return `<t:${Math.floor(date.getTime() / 1000)}:f>`;
}

export function whois(data: {
    id: number;
    username: string;
    joinDate: string;
    lastOnline: string;
    currency: number;
    role: string;
    description: string;
    pronouns: string;
    discord?: string;
    render?: { id: number };
}) {
    return [
        {
            title: data.username,
            description: data.description,
            color: parseInt("7f58d3", 16),
            url: "https://revilium.dev.madhouselabs.net/users/" + data.id + "/profile",
            fields: [
                { name: "Joined", value: dateToTimestamp(new Date(data.joinDate)), inline: true },
                { name: "Last Seen", value: dateToTimestamp(new Date(data.lastOnline)), inline: true },
            ],
            image: {
                url: "https://revilium.dev.madhouselabs.net/api/thumbnail/" + data.render?.id,
            },
            footer: {
                text: "💵 " + data.currency,
            },
        },
    ];
}
