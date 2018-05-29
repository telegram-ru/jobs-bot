# jobs-bot

```js
APP_BOT_TOKEN= yarn start
```

## Deploy to [now.sh](https://now.sh)

```
now secret add jobs-bot-token xxx:yyy
now -e APP_BOT_TOKEN=@jobs-bot-token
now alias set aaa-vglddytrom.now.sh aaa.now.sh
now scale aaa.now.sh 1
```
