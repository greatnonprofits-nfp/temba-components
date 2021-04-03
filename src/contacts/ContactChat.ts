import { css, html, property, TemplateResult } from 'lit-element';
import { RapidElement } from '../RapidElement';
import { Contact } from '../interfaces';
import { postForm, postJSON, postUrl } from '../utils';
import { TextInput } from '../textinput/TextInput';
import { Completion } from '../completion/Completion';
import { ContactHistory } from './ContactHistory';

export class ContactChat extends RapidElement {
  @property({ type: Object })
  contact: Contact = null;

  @property({ type: String })
  contactsEndpoint: string = '/api/v2/contacts.json';

  @property({ type: String })
  currentChat: string = '';

  @property({ type: Boolean })
  showDetails: boolean = false;

  public static get styles() {
    return css`
      :host {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);

        height: 100%;
        border-radius: 0.5rem;

        flex-grow: 1;
        width: 100%;
        display: block;
        background: #f2f2f2;
        overflow: hidden;
      }

      .chat-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #fff;
        overflow: hidden;
        border-radius: var(--curvature);
      }

      .chatbox {
        padding: 1em;
        background: #f2f2f2;
        border-top: 3px solid #e1e1e1;
      }

      temba-completion {
        --textarea-height: 2em;
      }

      a {
        color: var(--color-link-primary);
      }

      a:hover {
        text-decoration: underline;
        color: var(--color-link-primary-hover);
      }

      #send-button {
        margin-top: 1em;
        margin-right: 2px;
        --button-y: 2px;
      }

      .toolbar {
        position: relative;
        width: 2em;
        background: #f2f2f2;
        transition: all 600ms ease-in;
        z-index: 10;
        box-shadow: -1px 0px 6px 1px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
        border-top-right-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        padding: 0.5em 0;
      }

      .toolbar temba-icon {
        display: block;
        width: 1em;
        margin: 0 auto;
        fill: rgb(90, 90, 90);
      }

      .toolbar.closed {
        box-shadow: -1px 0px 1px 1px rgba(0, 0, 0, 0);
      }

      temba-contact-details {
        flex-basis: 16em;
        flex-grow: 0;
        flex-shrink: 0;
        transition: margin 600ms cubic-bezier(0.68, -0.55, 0.265, 1.05);
        z-index: 5;
        margin-right: -2.5em;
      }

      temba-contact-details.hidden {
        margin-right: -16em;
      }

      @media only screen and (max-width: 768px) {
        temba-contact-details {
          flex-basis: 12em;
          flex-shrink: 0;
        }

        temba-contact-details.hidden {
          margin-right: -12em;
        }
      }

      #close-button,
      #open-button {
        margin-top: 1em;
      }

      #details-button {
        margin-top: 0.25em;
        transform: rotate(180deg);
      }
    `;
  }

  constructor() {
    super();
  }

  public getContactHistory(): ContactHistory {
    return this.shadowRoot.querySelector(
      'temba-contact-history'
    ) as ContactHistory;
  }

  public refresh(): void {
    this.getContactHistory().refresh();
  }

  public updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // if we don't have an endpoint infer one
    if (changedProperties.has('contact')) {
      // focus our completion on load
      const completion = this.shadowRoot.querySelector(
        'temba-completion'
      ) as Completion;
      if (completion) {
        window.setTimeout(() => {
          completion.click();
        }, 0);
      }
    }
  }

  private handleChatChange(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const chat = event.currentTarget as TextInput;
    this.currentChat = chat.value;

    if (this.currentChat === '__debug') {
    }
  }

  private handleClose(event: MouseEvent) {
    /* postForm(`/ticket/update/${this.ticket.uuid}/?_format=json`, {
      status: 'C',
    })
      .then(response => {
        this.fireCustomEvent(CustomEventType.ContentChanged, {
          ticket: { uuid: this.ticket.uuid, status: 'C' },
        });
      })
      .catch((response: any) => {
        console.error(response.errors);
      });*/
  }

  private handleOpen(event: MouseEvent) {
    /*
    postForm(`/ticket/update/${this.ticket.uuid}/?_format=json`, {
      status: 'O',
    })
      .then(response => {
        this.fireCustomEvent(CustomEventType.ContentChanged, {
          ticket: { uuid: this.ticket.uuid, status: 'O' },
        });
      })
      .catch((response: any) => {
        console.error(response.errors);
      });
      */
  }

  private handleSend(event: Event) {
    postJSON(`/api/v2/broadcasts.json`, {
      contacts: [this.contact.uuid],
      text: this.currentChat,
    })
      .then(response => {
        this.currentChat = '';

        /* 
        if (this.ticket.status === 'C') {
          // if we are closed, reopen us
          postForm(`/ticket/update/${this.ticket.uuid}/?_format=json`, {
            status: 'O',
          }).then(() => {
            this.ticket.status = 'O';
            this.fireCustomEvent(CustomEventType.ContentChanged, {
              ticket: { uuid: this.ticket.uuid, status: 'O' },
              focus: true,
            });
            this.requestUpdate('ticket');
            this.scheduleRefresh(500);
          });
        } else {
          this.scheduleRefresh(500);
        }
        */
        this.refresh();
      })
      .catch(err => {
        // error message dialog?
        console.error(err);
      })
      .finally(() => {});
  }

  private handleDetailSlider(): void {
    this.showDetails = !this.showDetails;
  }

  public render(): TemplateResult {
    return html`
      <div style="display: flex; height: 100%;">
        <div style="flex-grow: 1; margin-right: 0em;">
          <div class="chat-wrapper">
            ${this.contact
              ? html` <temba-contact-history
                    uuid=${this.contact.uuid}
                  ></temba-contact-history>
                  <div class="chatbox">
                    <temba-completion
                      @change=${this.handleChatChange}
                      .value=${this.currentChat}
                      @keydown=${(e: KeyboardEvent) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          this.handleSend(e);
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      textarea
                    ></temba-completion>
                  </div>`
              : null}
          </div>
        </div>
        ${this.contact
          ? html`<temba-contact-details
              style="z-index: 10"
              class="${this.showDetails ? '' : 'hidden'}"
              .uuid="${this.contact.uuid}"
              .visible=${this.showDetails}
              endpoint="${this.contactsEndpoint}?uuid=${this.contact.uuid}"
            ></temba-contact-details>`
          : null}

        <div class="toolbar ${this.showDetails ? '' : 'closed'}">
          ${this.contact
            ? html`
                <temba-icon
                  id="details-button"
                  name="${this.showDetails ? 'chevrons-left' : 'sidebar'}"
                  @click="${this.handleDetailSlider}"
                  clickable
                ></temba-icon>
              `
            : null}
        </div>
      </div>
    `;
  }
}
