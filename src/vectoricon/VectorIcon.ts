import {
  customElement,
  property,
  LitElement,
  TemplateResult,
  html,
  css,
} from 'lit-element';
import { getClasses } from '../utils';

export class VectorIcon extends LitElement {
  @property({ type: String })
  name: string;

  // same as name but without implicit coloring
  @property({ type: String })
  id: string;

  @property({ type: Number })
  size: number = 1;

  @property({ type: Boolean })
  spin: boolean;

  @property({ type: Boolean })
  clickable: boolean;

  static get styles() {
    return css`
      :host {
        margin: auto;
        --icon-color: var(--text-color);
        --icon-color-hover: var(--icon-color);
      }

      :host([id='flow']),
      :host([name='flow']) {
        padding-bottom: 0.2em;
      }

      svg {
        fill: var(--icon-color);
        transform: rotate(360deg);
        transition: transform 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          fill 100ms ease-in-out,
          background 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          padding 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          margin 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .clickable:hover {
        cursor: pointer;
        fill: var(--color-link-primary);
        background: rgba(255, 255, 255, 0.95);
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        border-radius: 999px;
        transition: background 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          padding 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
          margin 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .wrapper.clickable:hover {
        padding: 0.35em;
        margin: -0.35em;
      }

      .spin {
        transform: rotate(0deg);
      }
    `;
  }

  constructor() {
    super();
  }

  lastName: string;

  public updated(changes: Map<string, any>) {
    super.updated(changes);
    if (changes.has('name')) {
      this.lastName = changes.get('name');
      if (this.lastName) {
        this.spin = !this.spin;
        setTimeout(() => {
          this.lastName = null;
          this.requestUpdate();
        }, 300);
      }
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="wrapper ${getClasses({ clickable: this.clickable })}">
        <svg
          style="height:${this.size}em;width:${this.size}em;"
          class="${getClasses({ spin: this.spin })}"
        >
          <use
            href="/sitestatic/icons/symbol-defs.svg?#icon-${this.lastName ||
            this.name ||
            this.id}"
          />
        </svg>
      </div>
    `;
  }
}
