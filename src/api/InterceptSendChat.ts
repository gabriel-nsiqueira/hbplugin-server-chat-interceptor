import { RoomPlugin, WorkerPlugin } from "@skeldjs/hindenburg";
import { ChatInterceptionCallback } from ".";

export const serverChatInterceptionMetadataKey = Symbol(
    "chatinterception:server"
);

function _InterceptSendChat<T extends RoomPlugin | WorkerPlugin>(
    pluginClass: T,
    descriptor: TypedPropertyDescriptor<ChatInterceptionCallback>
) {
    if (!descriptor.value) return;
    let pluginInterceptions: Set<ChatInterceptionCallback> | undefined =
        Reflect.getMetadata(serverChatInterceptionMetadataKey, pluginClass);
    if (!pluginInterceptions) {
        pluginInterceptions = new Set<ChatInterceptionCallback>();
        Reflect.defineMetadata(
            serverChatInterceptionMetadataKey,
            pluginInterceptions,
            pluginClass
        );
    }
    pluginInterceptions.add(descriptor.value);
}

export function InterceptSendChat<
    T extends typeof RoomPlugin | typeof WorkerPlugin
>(
    pluginClass: T
): (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<ChatInterceptionCallback>
) => void;
export function InterceptSendChat<T extends RoomPlugin | WorkerPlugin>(
    target: T,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<ChatInterceptionCallback>
): void;
export function InterceptSendChat<
    T extends typeof RoomPlugin | typeof WorkerPlugin,
    T2 extends RoomPlugin | WorkerPlugin
>(
    pluginClassOrTarget: T | T2,
    propertyKey?: string,
    descriptor?: TypedPropertyDescriptor<ChatInterceptionCallback>
):
    | ((
          target: any,
          propertyKey: string,
          descriptor: TypedPropertyDescriptor<ChatInterceptionCallback>
      ) => void)
    | void {
    if (typeof pluginClassOrTarget === "object") {
        _InterceptSendChat(pluginClassOrTarget, descriptor!);
        return;
    }
    return (target, _, descriptor) => _InterceptSendChat(target, descriptor);
}
