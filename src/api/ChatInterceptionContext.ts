import { SendChatOptions } from "@skeldjs/hindenburg";

export class ChatInterceptionContext {
    private _cancelled: boolean;

    constructor(
        /**
         * The message that was sent.
         */
        public message: string,

        /**
         * The options passed to send the message
         */
        public options: SendChatOptions
    ) {
        this._cancelled = false;
    }

    /**
     * If the message was cancelled or not
     */
    get cancelled() {
        return this._cancelled;
    }

    /**
     * Set the message as cancelled
     * @param cancelled The value cancelled will be set to
     */
    setCancelled(cancelled: boolean) {
        this._cancelled = cancelled;
    }
}
