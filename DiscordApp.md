# Client

## Use your Discord client for your instance

## Requirements

- Server source code: (main branch)

- Ngrok (your server)

- Discord App

### Steps (Localhost)

#### 1. Run your server (default port: 2023)

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1054675830942466098/image.png'>

#### 2. Run ngrok and copy https url

```sh
$ ngrok http https://localhost:2023
```

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1054676438453862440/image.png'>

#### 3.

- Go to `%appdata%/yourdiscord_client` (Example: `%appdata%/discordptb`)

- There is a file called `settings.json`. It should look like: (`Contents can be different depending on your Discord's client settings`)

```js
{
  "IS_MAXIMIZED": true,
  "IS_MINIMIZED": false,
  "WINDOW_BOUNDS": {
    "x": 335,
    "y": 86,
    "width": 940,
    "height": 600
  },
  "BACKGROUND_COLOR": "#202225"
}
```

- Add this line to  `settings.json` 

```js
"WEBAPP_ENDPOINT" : "url_from_ngrok"
```

- It should look like this after you add the line:

```js
{
  "IS_MAXIMIZED": true,
  "IS_MINIMIZED": false,
  "WINDOW_BOUNDS": {
    "x": 335,
    "y": 86,
    "width": 940,
    "height": 600
  },
  "BACKGROUND_COLOR": "#202225",
  "WEBAPP_ENDPOINT" : "https://b256-2402-800-61d9-8e53-21ab-b7d7-5cd1-bf74.ngrok.io"
}
```

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1054676817577005056/image.png'>

- After this quit your Discord client, reopen it and you are all done!

- Note: Ngrok very slow :))

## VPS (Linode, DigitalOcean, etc...)

- just run server and open port, change your url

## Test (BetterDiscord)

<img src='https://cdn.discordapp.com/attachments/820557032016969751/1054679039236907118/image.png'>
