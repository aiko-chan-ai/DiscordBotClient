<h1 align="center">Discord Bot Client</h1>

**Discord Bot Client** allows you to use your bot, just like any other user account, except Friends and Groups. 

## Overview

- [How to install it](#installation)
  - [Windows](#windows)
  - [Using prebuilt binaries](#using-prebuilt-binaries)
  - [Building from source](#building-from-source)
- [Login](#login)
- [Features](#features)
- [Discord Version](#version)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Similar projects](#similar-projects)
- [Credits](#credits)

**WARNING: Third party clients are discouraged and against the Discord TOS.**

Discord Bot Client is a custom [Discord](https://discord.com/app) client that aims to
support bot accounts and be aimed at power-users.


The application only uses the official Discord API and doesn't send data to
third parties. However, this application is not an official product by
Discord Inc.

![Demo Screenshot](https://cdn.discordapp.com/attachments/820557032016969751/1128535575281029150/image.png)

---

## Installation

### Windows

Discord Bot Client can be installed in Windows via [Winget](https://learn.microsoft.com/en-us/windows/package-manager/):
```
winget install aiko-chan-ai.DiscordBotClient
```

### Using prebuilt binaries

If you don't want to build the application yourself or use some kind of
package management system, you can get the latest binaries for the three
major systems in the release overview:

### 📦 Downloads

<table>
  <tr>
    <th>
      Platform
    </th>
    <th>
      Binary Type
    </th>
    <th>
      Download Link
    </th>
  </tr>
  <tr> 
    <td>
      Windows
    </td>
    <td align="center">
      <code>NSIS installer</code>
    </td>
    <td>
      <a href="https://github.com/aiko-chan-ai/DiscordBotClient/releases/latest/download/DiscordBotClient-win-x64.exe">
        <img alt="DiscordBotClient-win-x64.exe" src="https://img.shields.io/github/downloads/aiko-chan-ai/DiscordBotClient/latest/DiscordBotClient-win-x64.exe?style=for-the-badge&logo=windows&color=DDB6F2&logoColor=D9E0EE&labelColor=302D41"></a>
      </a>
    </td>
  </tr>
  <tr> <td>Linux</td>
    <td align="center"><code>.AppImage</code></td>
    <td>
      <a href="https://github.com/aiko-chan-ai/DiscordBotClient/releases/latest/download/DiscordBotClient-linux-x86_64.AppImage"><img alt="DiscordBotClient-linux-x86_64.AppImage" src="https://img.shields.io/github/downloads/aiko-chan-ai/DiscordBotClient/latest/DiscordBotClient-linux-x86_64.AppImage?style=for-the-badge&logo=linux&color=F5C2E7&logoColor=D9E0EE&labelColor=302D41"></a>
    </td>
  </tr>
  <tr>
    <td>Mac</td>
    <td align="center"><code>.dmg</code></td>
    <td>
      <a href="https://github.com/aiko-chan-ai/DiscordBotClient/releases/latest/download/DiscordBotClient-mac-x64.dmg"><img alt="DiscordBotClient-mac-x64.dmg" src="https://img.shields.io/github/downloads/aiko-chan-ai/DiscordBotClient/latest/DiscordBotClient-mac-x64.dmg?style=for-the-badge&logo=macos&color=E8A2AF&logoColor=D9E0EE&labelColor=302D41"></a>
    </td>
  </table>

### Building from source

In order to execute the following commands, you need to install **NodeJS v16 or**
higher. You can find nodejs packages at https://nodejs.org/en.
On top of that, you need to have **git** installed. It can be fund at
https://git-scm.com/downloads.

**UPDATES HAVE TO BE INSTALLED MANUALLY**

Open a command line and execute the following commands:

```shell
git clone https://github.com/aiko-chan-ai/DiscordBotClient.git
cd DiscordBotClient
npm install
npm run build
```

This will create an executable called `DiscordBotClient` or `DiscordBotClient.exe` in the `dist` folder depending on whether you are using Windows or not.

---

### Login

Logging in works via the UI on first startup of the application.

![screenshot](https://cdn.discordapp.com/attachments/820557032016969751/1128537663864045608/image.png)

> **Note**
> Enable `MessageContent` intent, other intents are optional

![image](https://cdn.discordapp.com/attachments/820557032016969751/1128538612175220906/image.png)

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

---

## Version

| Discord Build | Hash | Vencord | Discord Bot Client | Status |
| --- | --- | --- | --- | --- |
| Stable 161052 | c7e0778 | - | v1 | Deprecated |
| Stable 185832 | 29333f6 | v1.1.4 | v2.1 | Deprecated |
| Stable 204762 | 78f82ba | v1.2.8 | v2.2-v2.4 | Deprecated |
| Stable 263796 | 739ec78 | v1.6.7 | v3 | Latest |

---

## Troubleshooting

If you happen to encounter a crash or a bug, please submit a bug report via
the projects GitHub issue tracker.

# FAQ

In order to find answers to common questions, check out the FAQ in the [wiki](https://github.com/aiko-chan-ai/DiscordBotClient/issues/8):

## Similar projects

Here is a list of similar projects:

- [Discord Bot Client](https://github.com/SamuelScheit/discord-bot-client)
- [BotClient](https://github.com/DarkGuy10/BotClient)
- [ChrisEric1.GitHub.io](https://github.com/ChrisEric1/ChrisEric1.GitHub.io)
- [LiveBot](https://github.com/SebOuellette/LiveBot)
- [BetterDiscordPanel](https://github.com/SanjaySunil/BetterDiscordPanel)

Hit me up if you have a similar project, and I'll gladly add it to the list.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=aiko-chan-ai/DiscordBotClient&type=Date)](https://star-history.com/#aiko-chan-ai/DiscordBotClient&Date)

---

## How to update to the latest Discord version ?

1. Clone the repository and cd into it.

```sh
git clone https://github.com/aiko-chan-ai/DiscordBotClient.git
cd DiscordBotClient
```

2. Install required dependencies.
```sh
npm install
```

3. Download the latest script from Discord
```sh
electron scripts/findMainScript.js
```

4. Update Vencord (don't change `scripts` and `browser` folder) if necessary

5. Update BotClient plugin in Vencord

## Credits

Big thanks to [ChrisEric](https://github.com/CE1CECL) for helping me create a local proxy server! (code)

This project was mainly inspired by [SamuelScheit](https://github.com/SamuelScheit)
[Discord Bot Client](https://github.com/SamuelScheit/discord-bot-client), which he sadly didn't
develop any further.
