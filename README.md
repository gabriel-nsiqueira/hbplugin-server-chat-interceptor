# hbplugin-server-chat-interceptor

This is a [SkeldJS Hindenburg](https://github.com/SkeldJS/Hindenburg) api plugin to intercept `Room.sendChat` messages

## Getting started

Run `yarn add hbplugin-server-chat-interceptor` in your plugin directory.

Intercept messages with InterceptSendChat

Examples:

```ts
import { InterceptSendChat } from "hbplugin-server-chat-interceptor";
import { WorkerPlugin } from "@skeldjs/hindenburg";

export class extends WorkerPlugin {
    @InterceptSendChat
    onSendChat(ctx: ChatInterceptionContext) {
        console.log(ctx.options);
    }
}
```

or

```ts
import { InterceptSendChat } from "hbplugin-server-chat-interceptor";

class MyInterception {
    @InterceptSendChat(MyPlugin)
    onSendChat(ctx: ChatInterceptionContext) {
        console.log(ctx.message);
    }
}
```

## Compiling

Clone the project
```shell
git clone https://github.com/gabriel-nsiqueira/hbplugin-server-chat-interceptor
```

Install dependencies
```shell
yarn install
```

Run the build script
```shell
yarn build
```
