## Copyright (c) 2022, [dorpier](https://github.com/dorpier/dorpier)

## Event ? Enable DiscordBotClient first

> The event name is lowercase with the form `snake_case`. [All events here](https://discord.com/developers/docs/topics/gateway-events#receive-events)

```js
client.connect()

client.on("message_create", async function({ message }) {
    if (message.content == "!ping" && message.author.id === client.user.id) {
        await sendMessage('pong');
    }
});
```

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1053921457664708628/image.png'>

## Disconnect (Other functions can still be used, except for receiving events)
```js
client.disconnect()
```

## Class from Discord.js:

> [MessageActionRow](https://discord.js.org/#/docs/discord.js/v13/class/MessageActionRow)

> [MessageButton](https://discord.js.org/#/docs/discord.js/v13/class/MessageButton)

> [MessageSelectMenu](https://discord.js.org/#/docs/discord.js/v13/class/MessageSelectMenu)

> [MessageEmbed](https://discord.js.org/#/docs/discord.js/v13/class/MessageEmbed)

> [BitField](https://discord.js.org/#/docs/discord.js/v13/class/BitField)

> [Permissions](https://discord.js.org/#/docs/discord.js/v13/class/Permissions)

## Functions

#### getCurrentChannel
```js
let channel = getCurrentChannel()
console.log(channel)
```

#### getCurrentGuild
```js
let guild = getCurrentGuild()
console.log(guild)
```

#### [sendMessage](https://github.com/aiko-chan-ai/DiscordBotClient/blob/main/README.md#send-embed-button-menu-etc)
```js
sendMessage('Hello World')
```

#### getModule
```js
const module = getModule('loginToken')
module.loginToken('BotToken')
```
#### findModule
```js
const module = findModule('loginToken')
console.log(module)
```

#### switchToken
```js
switchToken('BotToken')
```

### getStatus
```js
getStatus('userId')
```

## Global Variables

#### `client`
> [DiscordBotClient](https://github.com/aiko-chan-ai/DiscordBotClient/blob/main/API.md#DiscordBotClient)

#### `localStorage_`
> window.localStorage

#### `loadFullGuild`, `allGuild`, `intentBot`
> number

#### `lasestGuildIdVoiceConnect`
> Snowflake (string)


## DiscordBotClient
```js
export class Client {
    constructor() {
        this.events: Object;
        this._connected: Boolean;
    }

    get connected(): Boolean

    connect(): void

    disconnect(): void

    on(event, callback, raw = false): void

    async emit(event, data): void

    get sessionID(): String

    get fingerprint(): String

    get requiredAction(): unknown

    get user(): User

    get guilds(): Array<Guild>

    get guildFolders(): Array<GuildFolder>

    get privateChannels(): Array<DMChannel>

    getGuild(id): Guild

    getGuildChannels(guildID): Array<GuildChannel>

    getChannel(id): GuildChannel | DMChannel

    getChannelThreads(channelID): Array<ThreadChannel>

    createDM(...id): DMChannel

    getUser(id): User

    getGuildMember(guildID, id): GuildMember

    getGuildMembers(guildID): Array<GuildMember>

    requestGuildMembers(
        ids,
        { query = "", limit = 10, presences = true, userIDs = [] },
    ) {
    }: Array<GuildMember>

    startTyping(channelID): void

    stopTyping(channelID): void

    getChannelMessages(channelID): Array<Message>

    sendMessage(
        channel,
        content = "",
        {
            tts = false,
            messageReference = null,
            allowedMentions = null,
            stickerIDs = null,
        },
    ) {
    }: unknown

    sendClydeMessage(channel, content, embeds): unknown

    sendClydeError(channel): unknown
}
```