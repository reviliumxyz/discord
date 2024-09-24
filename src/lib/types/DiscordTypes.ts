export enum CommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3,
    PRIMARY_ENTRY_POINT = 4,
}

export enum IntegrationTypes {
    GUILD_INSTALL = 0,
    USER_INSTALL = 1,
}

export enum CommandOptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11,
}

export enum ContextTypes {
    GUILD = 0,
    BOT_DM = 1,
    PRIVATE_CHANNEL = 2,
}
