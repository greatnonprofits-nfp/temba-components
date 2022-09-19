import { css, html, TemplateResult } from 'lit';
import { Group } from '../interfaces';
import { ContactStoreElement } from './ContactStoreElement';

const STATUS = {
  stopped: { name: 'Stopped', icon: 'x-octagon' },
  blocked: { name: 'Blocked', icon: 'slash' },
  archived: { name: 'Archived', icon: 'archive' },
};

export class ContactBadges extends ContactStoreElement {
  static get styles() {
    return css`
      temba-label {
        margin: 0.3em;
      }

      .badges {
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }

  public render(): TemplateResult {
    if (this.data) {
      const status = STATUS[this.data.status];

      return html`
        <div class="badges">
          ${status && this.data.status !== 'active'
            ? html`
                <temba-label
                  icon="${status.icon}"
                  onclick="goto(event)"
                  href="/contact/${status.name.toLowerCase()}"
                  secondary
                  clickable
                  shadow
                >
                  ${status.name}
                </temba-label>
              `
            : null}
          ${this.data.flow
            ? html`
                <temba-label
                  icon="flow"
                  onclick="goto(event)"
                  href="/contact/?search=flow+%3D+${encodeURIComponent(
                    '"' + this.data.flow.name + '"'
                  )}"
                  clickable
                  primary
                  shadow
                >
                  ${this.data.flow.name}
                </temba-label>
              `
            : null}
          ${this.data.language
            ? html`
                <temba-label
                  icon="globe"
                  onclick="goto(event)"
                  href="/contact/?search=language+%3D+${encodeURIComponent(
                    '"' + this.data.language + '"'
                  )}"
                  clickable
                  primary
                  shadow
                >
                  ${this.store.getLanguageName(this.data.language)}
                </temba-label>
              `
            : null}
          ${this.data.groups.map((group: Group) => {
            return html`
              <temba-label
                class="group"
                onclick="goto(event)"
                href="/contact/filter/${group.uuid}/"
                icon=${group.is_dynamic ? 'atom' : 'users'}
                clickable
                shadow
              >
                ${group.name}
              </temba-label>
            `;
          })}
        </div>
      `;
    } else {
      return null;
    }
  }
}
