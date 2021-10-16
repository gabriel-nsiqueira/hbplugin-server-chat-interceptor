import {
    Color,
    Hat,
    MessageSide,
    Room,
    SendChatOptions,
    Skin,
} from "@skeldjs/hindenburg";
import {
    ChatInterceptionCallback,
    ChatInterceptionContext,
    serverChatInterceptionMetadataKey,
} from "..";

async function _onServerSendChat(
    room: Room,
    message: string,
    options: SendChatOptions
) {
    const context = new ChatInterceptionContext(message, options);
    for (const [, plugin] of room.worker.loadedPlugins) {
        if (context.cancelled) break;
        const callbacks: ChatInterceptionCallback[] = Reflect.getMetadata(
            serverChatInterceptionMetadataKey,
            plugin
        );
        if (!callbacks) continue;
        for (const callback of callbacks) {
            if (context.cancelled) break;
            callback(context);
        }
    }
    for (const [, plugin] of room.loadedPlugins) {
        if (context.cancelled) break;
        const callbacks: ChatInterceptionCallback[] = Reflect.getMetadata(
            serverChatInterceptionMetadataKey,
            plugin
        );
        if (!callbacks) continue;
        for (const callback of callbacks) {
            if (context.cancelled) break;
            callback(context);
        }
    }
    return context;
}

const oldSendChat = Room.prototype.sendChat;
Room.prototype.sendChat = async function (
    message: string,
    options?: Partial<SendChatOptions>
) {
    const colorMap = Color as any as { [key: string]: Color };
    const hatMap = Hat as any as { [key: string]: Hat };
    const skinMap = Skin as any as { [key: string]: Skin };
    const context = await _onServerSendChat(this, message, {
        side: MessageSide.Left,
        targets: undefined,
        name: this.config.serverPlayer.name || "<color=yellow>[Server]</color>",
        color: colorMap[this.config.serverPlayer.color || "Yellow"],
        hat: hatMap[this.config.serverPlayer.hat || "None"],
        skin: skinMap[this.config.serverPlayer.skin || "None"],
        ...options,
    });
    if (context.cancelled) return;
    await oldSendChat.call(this, context.message, context.options);
};
