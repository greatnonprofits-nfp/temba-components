/* eslint-disable @typescript-eslint/no-this-alias */
import { LitElement, TemplateResult, html, css, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';

interface Message {
  text: string;
  type: string;
  identifier?: string;
  origin?: string;
  timestamp: number;
}

// how long of a window to show time between batches
const BATCH_TIME_WINDOW = 30 * 60 * 1000;

const TIME_FORMAT = { hour: 'numeric', minute: '2-digit' } as any;
const DAY_FORMAT = {
  weekday: undefined,
  year: 'numeric',
  month: 'short',
  day: 'numeric',
} as any;
const VERBOSE_FORMAT = {
  weekday: undefined,
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as any;

export class WebChat extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex-inline;
        align-items: center;
        align-self: center;
        --curvature: 0.6em;
        --color-primary: hsla(208, 70%, 55%, 1);
      }

      .block {
        margin-bottom: 1em;
      }

      .time {
        text-align: center;
        font-size: 0.8em;
        color: #999;
        margin-top: 2em;
        border-top: 1px solid #f8f8f8;
        padding: 1em;
        margin-left: 4em;
        margin-right: 4em;
      }

      .first .time {
        margin-top: 0;
        border-top: none;
        padding-top: 0;
      }

      .row {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      }

      .input-panel {
        padding: 1em;
        background: #fff;
      }

      .avatar {
        margin-top: 0.6em;
        margin-right: 0.6em;
        flex-shrink: 0;
        width: 2em;
        height: 2em;
        overflow: hidden;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 7px 0px,
          rgba(0, 0, 0, 0.2) 0px 1px 2px 0px,
          inset 0 0 0 0.15em rgba(0, 0, 0, 0.1);
      }

      .toggle {
        flex-shrink: 0;
        width: 4em;
        height: 4em;
        overflow: hidden;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1em 0.7em,
          rgba(0, 0, 0, 0.2) 0px 1px 2px 0px,
          inset 0 0 0 0.25em rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: box-shadow 0.2s ease-out;
        position: absolute;
        bottom: 1em;
        right: 1em;
      }

      .toggle:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1em 0.7em,
          rgba(0, 0, 0, 0.4) 0px 1px 2px 0px,
          inset 0 0 0 0.25em rgba(0, 0, 0, 0.2);
      }

      .incoming .row {
        flex-direction: row-reverse;
        margin-left: 1em;
      }

      .bubble {
        padding: 1em;
        padding-bottom: 0.5em;
        background: #fafafa;
        border-radius: var(--curvature);
      }

      .bubble .name {
        font-size: 0.9em;
        font-weight: 400;
        margin-bottom: 0.5em;
      }

      .outgoing .bubble {
        border-top-left-radius: 0;
      }

      .incoming .bubble {
        background: var(--color-primary);
        color: white;
        border-top-right-radius: 0;
      }

      .message {
        margin-bottom: 0.5em;
      }

      .chat {
        max-width: 50vw;
        width: 28rem;
        border-radius: var(--curvature);
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 7px 0px,
          rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.1) 5em 5em 5em 5em;
        position: absolute;
        bottom: 2em;
        right: 1em;
        transition: all 0.2s ease-out;
        transform: scale(0.9);
        pointer-events: none;
        opacity: 0;
      }

      .chat.open {
        bottom: 6em;
        opacity: 1;
        transform: scale(1);
        pointer-events: initial;
      }

      .messages {
        background: #fff;
      }

      .scroll {
        height: 40rem;
        max-height: 60vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        padding: 1em 1em 0 1em;
      }

      .messages:before {
        content: '';
        background:     /* Shadow TOP */ radial-gradient(
            farthest-side at 50% 0,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0)
          )
          center top;
        height: 10px;
        display: block;
        position: absolute;
        max-width: 50vw;
        width: 28rem;
        transition: opacity 0.1s ease-out;
      }

      .messages:after {
        content: '';
        background:       /* Shadow BOTTOM */ radial-gradient(
            farthest-side at 50% 100%,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0)
          )
          center bottom;
        height: 10px;
        display: block;
        position: absolute;
        margin-top: -10px;
        max-width: 50vw;
        width: 28rem;
        margin-right: 5em;
        transition: opacity 0.1s ease-out;
      }

      .scroll-at-top .messages:before {
        opacity: 0;
      }

      .scroll-at-bottom .messages:after {
        opacity: 0;
      }

      .input {
        border: none;
        flex-grow: 1;
      }

      .input:focus {
        outline: none;
      }

      input::placeholder {
        opacity: 0.3;
      }

      .input.inactive {
        //pointer-events: none;
        //opacity: 0.3;
      }

      .active {
      }

      .send-icon {
        color: #eee;
        pointer-events: none;
        transform: rotate(-45deg);
        transition: transform 0.2s ease-out;
      }

      .pending .send-icon {
        color: var(--color-primary);
        pointer-events: initial;
        transform: rotate(0deg);
      }
    `;
  }

  @property({ type: String })
  channel: string;

  @property({ type: String })
  urn: string;

  @property({ type: Array })
  messages: Message[][] = [];

  // is our socket connection established
  @property({ type: Boolean })
  active: boolean;

  // is the chat widget open
  @property({ type: Boolean })
  open = false;

  @property({ type: Boolean })
  hasPendingText = false;

  @property({ type: Boolean, attribute: false })
  hideTopScroll = true;

  @property({ type: Boolean, attribute: false })
  hideBottomScroll = true;

  private sock: WebSocket;

  public constructor() {
    super();
  }

  private openSocket(): void {
    console.log('opening socket..');
    const webChat = this;
    let url = `ws://localhost:8070/start?channel=${this.channel}`;
    if (this.urn) {
      url = `${url}&identifier=${this.urn}`;
    }
    this.sock = new WebSocket(url);
    this.sock.onclose = function (event) {
      console.log('socket closed');
      webChat.active = false;
    };
    this.sock.onmessage = function (event) {
      console.log(event.data);
      const msg = JSON.parse(event.data) as Message;
      if (msg.type === 'chat_started') {
        if (webChat.urn !== msg.identifier) {
          webChat.messages = [];
        }
        webChat.urn = msg.identifier;
        webChat.active = true;
        webChat.requestUpdate('messages');
      } else if (msg.type === 'chat_resumed') {
        webChat.urn = msg.identifier;
        webChat.active = true;
      } else if (msg.type === 'msg_out') {
        msg['timestamp'] = new Date().getTime();
        webChat.addMessage(msg);
        webChat.requestUpdate('messages');
      }
    };
  }

  private restoreFromLocal(): void {
    console.log('Restoring from localStorage..');
    const data = JSON.parse(localStorage.getItem('temba-chat') || '{}');
    const urn = 'urn' in data ? data['urn'] : null;
    if (urn && !this.urn) {
      this.urn = urn;
      const messages = 'messages' in data ? data['messages'] : [];
      this.messages.push(...messages);
    }
  }

  private writeToLocal(): void {
    console.log('Writing to localStorage..');
    if (this.urn) {
      const data = { urn: this.urn, messages: this.messages, version: 1 };
      localStorage.setItem('temba-chat', JSON.stringify(data));
    }
  }

  public firstUpdated(
    changed: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(changed);
  }

  private focusInput() {
    const input = this.shadowRoot.querySelector('.input') as any;
    input.focus();
  }

  public updated(
    changed: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(changed);

    if (this.open && changed.has('open') && changed.get('open') !== undefined) {
      const scroll = this.shadowRoot.querySelector('.scroll');
      const hasScroll = scroll.scrollHeight > scroll.clientHeight;
      this.hideBottomScroll = true;
      this.hideTopScroll = !hasScroll;
      this.scrollToBottom();
      this.focusInput();

      if (!this.active) {
        this.openSocket();
      }
    }

    if (changed.has('channel')) {
      this.restoreFromLocal();
    }

    if (changed.has('messages')) {
      console.log('messages changed', this.messages);
      this.writeToLocal();
      console.log(this.messages);
      this.scrollToBottom();
    }
  }

  private addMessage(msg: Message) {
    let lastGroup =
      this.messages.length > 0 ? this.messages[this.messages.length - 1] : [];
    const isSame = lastGroup.length === 0 || lastGroup[0].origin === msg.origin;
    if (!isSame) {
      lastGroup = [];
    }
    if (lastGroup.length === 0) {
      this.messages.push(lastGroup);
    }
    lastGroup.push(msg);
  }

  public openChat(): void {
    this.open = true;
  }

  public handleKeyUp(event: any) {
    if (this.hasPendingText && event.key === 'Enter') {
      this.sendPendingMessage();
    }

    this.hasPendingText = event.target.value.length > 0;
  }

  private sendPendingMessage() {
    if (this.active) {
      const input = this.shadowRoot.querySelector('.input') as any;
      const text = input.value;
      input.value = '';

      const msg = {
        type: 'msg_in',
        text: text,
        timestamp: new Date().getTime(),
      };

      this.addMessage(msg);
      this.sock.send(JSON.stringify(msg));
      this.requestUpdate('messages');
      this.hasPendingText = input.value.length > 0;
    }
  }

  private scrollToBottom() {
    const scroll = this.shadowRoot.querySelector('.scroll');
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
      this.hideBottomScroll = true;
    }
  }

  private renderMessageGroup(
    messages: Message[],
    idx: number,
    groups: Message[][]
  ): TemplateResult {
    let lastBatchTime = null;
    if (idx > 0) {
      const lastGroup = groups[idx - 1];
      if (lastGroup && lastGroup.length > 0) {
        lastBatchTime = lastGroup[lastGroup.length - 1].timestamp;
      }
    }

    const newBatchTime = messages[0].timestamp;
    const showTime = newBatchTime - lastBatchTime > BATCH_TIME_WINDOW;

    let timeDisplay = null;
    if (showTime) {
      let lastTime = null;
      const newTime = new Date(newBatchTime);
      if (lastBatchTime) {
        lastTime = new Date(lastBatchTime);
      }
      const showDay = !lastTime || newTime.getDate() !== lastTime.getDate();
      if (showDay) {
        timeDisplay = html`<div class="time">
          ${newTime.toLocaleDateString(undefined, DAY_FORMAT)}
        </div>`;
      } else {
        timeDisplay = html`<div class="time">
          ${newTime.toLocaleTimeString(undefined, TIME_FORMAT)}
        </div>`;
      }
    }

    const blockTime = new Date(messages[messages.length - 1].timestamp);
    const incoming = !messages[0].origin;

    return html` <div
      class="block  ${incoming ? 'incoming' : 'outgoing'} ${idx === 0
        ? 'first'
        : ''}"
      title="${blockTime.toLocaleTimeString(undefined, VERBOSE_FORMAT)}"
    >
      ${timeDisplay}
      <div class="row">
        ${!incoming
          ? html`
              <div
                class="avatar"
                style="background: center / contain no-repeat url(https://dl-textit.s3.amazonaws.com/orgs/6418/media/5e81/5e814c83-bf33-43ea-b6c1-ee46f8acaf34/avatar.jpg)"
              ></div>
            `
          : null}

        <div class="bubble">
          ${!incoming ? html`<div class="name">Henry McHelper</div>` : null}
          ${messages.map(msg => html`<div class="message">${msg.text}</div>`)}
        </div>
      </div>
    </div>`;
  }

  private handleScroll(event: any) {
    this.hideBottomScroll =
      Math.round(event.target.scrollTop + event.target.clientHeight) >=
      event.target.scrollHeight;
    this.hideTopScroll = event.target.scrollTop === 0;
  }

  private handleClickInputPanel(event: any) {
    const input = this.shadowRoot.querySelector('.input') as any;
    input.focus();
  }

  private toggleChat() {
    this.open = !this.open;
  }

  public render(): TemplateResult {
    return html`
      <div
        class="chat ${this.hideTopScroll ? 'scroll-at-top' : ''} ${this
          .hideBottomScroll
          ? 'scroll-at-bottom'
          : ''} ${this.open ? 'open' : ''}"
      >
        <div class="messages">
          <div class="scroll" @scroll=${this.handleScroll}>
            ${this.messages
              ? this.messages.map(
                  (msgGroup, idx, groups) =>
                    html`${this.renderMessageGroup(msgGroup, idx, groups)}`
                )
              : null}
          </div>
        </div>
        <div
          class="row input-panel ${this.hasPendingText ? 'pending' : ''}"
          @click=${this.handleClickInputPanel}
        >
          <input
            class="input ${this.active ? 'active' : 'inactive'}"
            type="text"
            placeholder="Message.."
            @keydown=${this.handleKeyUp}
          />
          <temba-icon
            tabindex="1"
            class="send-icon"
            name="send"
            size="1"
            clickable
            @click=${this.sendPendingMessage}
          ></temba-icon>
        </div>
      </div>

      <div @click=${this.toggleChat}>
        <div
          class="toggle"
          style="background: center / contain no-repeat url(https://dl-textit.s3.amazonaws.com/orgs/6418/media/5e81/5e814c83-bf33-43ea-b6c1-ee46f8acaf34/avatar.jpg)"
        ></div>
      </div>
    `;
  }
}
