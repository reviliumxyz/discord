export async function getUser(id: number) {
    try {
        const response = await fetch("https://revilium.dev.madhouselabs.net/api/user/" + id);
        const body = await response.json();

        return body;
    } catch (e) {
        return false;
    }
}

export async function searchUser(query: { username?: string; discord?: string }) {
    try {
        const response = await fetch(
            `https://revilium.dev.madhouselabs.net/api/user/search?${query.username ? `username=${query.username}` : `discord=${query.discord}`}`
        );

        const body = await response.json();
        if (body?.message === "Not Found") return false;

        return body;
    } catch (e) {
        return false;
    }
}

export async function createInvite(referrer: number) {
    try {
        const response = await fetch("https://revilium.dev.madhouselabs.net/api/invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.SECRET || "idiot",
            },
            body: JSON.stringify({ referrerId: referrer }),
        });

        const body = await response.json();

        return body;
    } catch (e) {
        return false;
    }
}
