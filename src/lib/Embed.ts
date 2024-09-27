import { ERROR_COLOR, SUCCESS_COLOR } from "./Config";

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
            color: SUCCESS_COLOR,
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

export function userNotFound() {
    return [
        {
            color: ERROR_COLOR,
            description: "User not found.",
        },
    ];
}

export function notEntitled() {
    return [
        {
            color: ERROR_COLOR,
            description: "You are not entitled to a Revilium account.",
        },
    ];
}

export function alreadyClaimed() {
    return [
        {
            color: ERROR_COLOR,
            description: "You already have a Revilium account.",
        },
    ];
}

export function claimSuccess(invinte: string) {
    return [
        {
            color: SUCCESS_COLOR,
            description: `Your invite key is \`${invinte}\`!\nRegister on https://revilium.dev.madhouselabs.net/`,
        },
    ];
}
