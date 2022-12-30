# DiscordBotClient

## Web:

> Using extension https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/main/extension.rar

> Source: https://github.com/aikodbc/aikodbc.github.io

## Electron app ?

> see branch `electron`

## [BotClient API](https://github.com/aiko-chan-ai/DiscordBotClient/blob/main/API.md)

## Download > [Releases](https://github.com/aiko-chan-ai/DiscordBotClient/releases)
 
> Thanks to [ChrisEric](https://github.com/CE1CECL)

> **Note**
> Enable `MessageContent` intent, other intents are optional

![image](https://user-images.githubusercontent.com/71698422/204597818-cdc305c2-e753-4546-ad51-3da41721aef0.png)


---

**Discord Bot Client** allows you to use your bot, just like any other user account, except Friends and Groups. 

---

## Features

- **View Guilds** *(Lazy load them)*
- **Manage Guilds** (Name, Image, Audit log, Emoji, Webhooks, Invites, Bans, Widget, Moderation, Roles)
- **Manage Channels** (Add, Delete, Name, Permissions, Invites, Webhooks, Slowmode, NSFW, Topic, Forums, Threads)
- **Messages** (Send, View History, Embeds, View Reactions, Add/Remove Reactions, Delete, Edit, Pin)
- **Create a Guild** (if the bot has fewer than 10 Servers)
- **Voice Support** (Text-in-Voice and watch the user using the camera)
- **Use Emojis from other servers** (Nitro)
- **GIF Search**
- **Send Files**
- **DM's** (DM's will show up, after a user dms the bot)

> **Note**
> Don't use the message search bar, it may cause the application to crash

---

## Send Embed, Button, Menu, etc.

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1049681619419676692/image.png'>

```js
sendMessage(options)
```

- `options.content = String`
- `options.embeds = Array<Embed>`
- `options.components = Array<MessageActionRow<MessageButton | MessageSelectMenu>>`
> **Documents:**
> https://discord.js.org/#/docs/discord.js/v13/typedef/BaseMessageOptions


---

## Build

>  __You need to install [NodeJS](https://nodejs.org/en/download/).__ 

### Step 1


>  Install all dependencies with ```npm i``` 

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1047190965020016640/image.png'>

### Step 2


>  Start with ```npm run start``` 

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1047191085010649128/image.png'>

### Step 3


>  Login with your bot token (Your browser will open automatically)

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1047191156615819274/image.png'>

### Result


<img src='https://cdn.discordapp.com/attachments/820557032016969751/1047193189376868362/image.png'>

