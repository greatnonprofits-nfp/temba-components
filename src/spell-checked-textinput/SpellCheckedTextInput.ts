import 'lit-flatpickr';
import { css, html, property, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { CharCount } from '../charcount/CharCount';
import { sanitize } from '../textinput/helpers';
import { Modax } from '../dialog/Modax';
import { FormElement } from '../FormElement';

enum SpellCheckerMode {
  VIEW,
  EDIT,
}

interface SpellCheckerResult {
  from: number;
  to: number;
  message: string;
  suggestions: string[];
}

interface SpellCheckerResultPiece {
  text: string;
  result?: SpellCheckerResult;
}

type SpellCheckerFunc = (text: string) => Promise<SpellCheckerResult[]>;

export class SpellCheckedTextInput extends FormElement {
  static get styles() {
    return css`
      .input-container {
        position: relative;
        border-radius: var(--curvature-widget);
        cursor: text;
        background: var(--color-widget-bg);
        border: 1px solid var(--color-widget-border);
        transition: all ease-in-out 200ms;
        display: flex;
        flex-direction: row;
        align-items: stretch;

        box-shadow: var(--widget-box-shadow);

        caret-color: var(--input-caret);
      }

      .clear-icon {
        --icon-color: var(--color-text-dark-secondary);
        cursor: pointer;
        margin: auto;
        padding-right: 10px;
        line-height: 1;
      }

      .clear-icon:hover {
        --icon-color: var(--color-text-dark);
      }

      .hidden {
        visibility: hidden;
        position: absolute;
      }

      .input-container:focus-within {
        border-color: var(--color-focus);
        background: var(--color-widget-bg-focused);
        box-shadow: var(--widget-box-shadow-focused);
      }

      .input-container:hover {
        background: var(--color-widget-bg-focused);
      }

      .textarea-view {
        min-height: 30px;
      }

      textarea,
      .textarea-view {
        height: var(--textarea-height);
      }

      .textinput,
      .textinput-view {
        padding: var(--temba-textinput-padding);
        border: none;
        flex: 1;
        margin: 0;
        background: none;
        color: var(--color-widget-text);
        font-family: var(--font-family);
        font-size: var(--temba-textinput-font-size);
        line-height: normal;
        cursor: text;
        resize: none;
        font-weight: 300;
        width: 100%;
      }

      .textinput:focus,
      .textinput-view:focus {
        outline: none;
        box-shadow: none;
        cursor: text;
      }

      .textinput::placeholder,
      .textinput-view::placeholder {
        color: var(--color-placeholder);
        font-weight: 300;
      }

      .grow-wrap {
        display: flex;
        align-items: stretch;
        width: 100%;
      }

      .spell-correction {
        position: relative;
      }

      .spell-correction .text {
        cursor: text;
        display: inline;
        text-decoration: var(--color-error) wavy underline;
      }

      .spell-correction .tooltip {
        display: none;
        flex-direction: column;
        gap: 8px;
        position: absolute;
        bottom: 18px;
        left: 50%;
        min-width: 120px;
        transform: translateX(-50%);
        cursor: default;

        color: white;
        padding: 6px;
        color: var(--color-widget-text);
        background: var(--color-widget-bg);
        border: 1px solid var(--color-widget-border);
        border-radius: var(--curvature-widget);
        box-shadow: var(--widget-box-shadow);
        z-index: 100;
      }

      .spell-correction:hover .tooltip {
        display: flex;
      }

      .spell-correction .tooltip .tail {
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) rotate(-45deg);
        width: 5px;
        height: 5px;
        border-left: 1px solid var(--color-widget-border);
        border-bottom: 1px solid var(--color-widget-border);
        background: var(--color-widget-bg);
      }

      .spell-correction .tooltip .suggestions {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
      }

      .spell-correction .tooltip .suggestion {
        cursor: pointer;
        text-decoration: var(--color-link-primary) underline;
      }

      .spell-correction .tooltip .suggestion:hover {
        font-weight: bold;
      }

      .grow-wrap > div {
        border: 0px solid green;
        width: 100%;
        padding: var(--temba-textinput-padding);
        flex: 1;
        margin: 0;
        background: none;
        color: var(--color-widget-text);
        font-family: var(--font-family);
        font-size: var(--temba-textinput-font-size);
        line-height: normal;
        cursor: text;
        resize: none;
        font-weight: 300;
        width: 100%;
        opacity: 0;
      }

      .grow-wrap textarea,
      .grow-wrap .textarea-view {
        margin-left: -100%;
      }
    `;
  }

  @property({ type: Boolean })
  textarea: boolean;

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  @property({ type: Number })
  maxlength: number;

  @property({ type: Object })
  inputElement: HTMLInputElement;

  @property({ type: Boolean })
  clearable: boolean;

  @property({ type: Boolean })
  gsm: boolean;

  @property({ type: String })
  counter: string;

  // if we are still loading
  @property({ type: Boolean })
  loading = true;

  @property({ type: Boolean })
  submitOnEnter = true;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  autogrow = false;

  @property({ type: Boolean })
  private checkingSpelling = false;

  @property({ type: TemplateResult })
  private spellCheckResults: TemplateResult;

  @property({ type: SpellCheckerMode })
  spellCheckerMode = SpellCheckerMode.VIEW;

  counterElement: CharCount = null;
  cursorStart = -1;
  cursorEnd = -1;
  spellCheckerFunc: SpellCheckerFunc;

  public constructor() {
    super();
    if (Object.prototype.hasOwnProperty.call(window, 'spellCheckerFunc')) {
      this.spellCheckerFunc = window['spellCheckerFunc'] as SpellCheckerFunc;
    } else {
      console.error(
        "No 'spellCheckerFunc' of type '(text: string) => Promise<SpellCheckerResult[]>' is found."
      );
    }
  }

  public firstUpdated(changes: Map<string, any>) {
    super.firstUpdated(changes);

    this.inputElement = this.shadowRoot.querySelector('.textinput');
    this.doSpellCheck();

    if (changes.has('counter')) {
      let root = this.getParentModax() as any;
      if (root) {
        root = root.shadowRoot;
      }
      if (!root) {
        root = document;
      }
      this.counterElement = root.querySelector(this.counter);
      this.counterElement.text = this.value;
    }
  }

  public updated(changes: Map<string, any>) {
    super.updated(changes);
    if (changes.has('value')) {
      this.setValues([this.value]);
      this.fireEvent('change');

      if (this.textarea && this.autogrow) {
        const autogrow = this.shadowRoot.querySelector(
          '.grow-wrap > div'
        ) as HTMLDivElement;
        autogrow.innerText = this.value + String.fromCharCode(10);
      }

      if (this.cursorStart > -1 && this.cursorEnd > -1) {
        this.inputElement.setSelectionRange(this.cursorStart, this.cursorEnd);
        this.cursorStart = -1;
        this.cursorEnd = -1;
      }
    }
  }

  private handleClear(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.setValue(null);
  }

  private updateValue(value: string): void {
    const cursorStart = this.inputElement.selectionStart;
    const cursorEnd = this.inputElement.selectionEnd;

    const sanitized = this.sanitizeGSM(value);

    if (sanitized !== value) {
      this.cursorStart = cursorStart;
      this.cursorEnd = cursorEnd;
    }

    this.value = sanitized;

    if (this.textarea) {
      this.inputElement.value = this.value;
    }

    if (this.counterElement) {
      this.counterElement.text = value;
    }
  }

  private sanitizeGSM(text: string): string {
    return this.gsm ? sanitize(text) : text;
  }

  private handleChange(update: any): void {
    if (this.disabled) {
      return;
    }
    this.updateValue(update.target.value);
    this.fireEvent('change');
  }

  private handleContainerClick(): void {
    if (this.disabled) {
      return;
    }
    this.focusOnInputField();
  }

  private focusOnInputField() {
    // Make the input field visible and focus on it
    this.spellCheckerMode = SpellCheckerMode.EDIT;
    setTimeout(() => {
      this.inputElement = this.shadowRoot.querySelector('.textinput');
      this.inputElement.focus();
    }, 1);
  }

  private handleBlur() {
    // Hide the input field and show the text
    this.doSpellCheck();
    this.spellCheckerMode = SpellCheckerMode.VIEW;
    this.blur();
  }

  private handleInput(update: any): void {
    if (this.disabled) {
      return;
    }

    this.updateValue(update.target.value);
    this.setValues([this.value]);
    this.fireEvent('input');
  }

  /** we just return the value since it should be a string */
  public serializeValue(value: any): string {
    return value;
  }

  public doSpellCheck(): void {
    this.spellCheckResults = html`${this.value}`;
    if (!this.spellCheckerFunc) {
      this.spellCheckResults = html`${[{ text: this.value }].map(
        this.renderSpellCheckResultPiece.bind(this)
      )}`;
      return;
    }

    this.checkingSpelling = true;
    this.spellCheckerFunc(this.value)
      .then((results: SpellCheckerResult[]) => {
        const pieces: SpellCheckerResultPiece[] = [];
        const resultsLength = results.length;
        results
          .sort((a, b) => a.from - b.from)
          .reduce((offset, result, index) => {
            // Add the text before the result
            if (offset < result.from) {
              pieces.push({ text: this.value.substring(offset, result.from) });
            }
            // Add the result
            pieces.push({
              text: this.value.substring(result.from, result.to),
              result,
            });
            offset = result.to;
            // Add the text after the last result
            if (index + 1 === resultsLength && offset < this.value.length) {
              pieces.push({ text: this.value.substring(offset) });
            }
            return offset;
          }, 0);
        this.spellCheckResults = html`${pieces.map(
          this.renderSpellCheckResultPiece.bind(this)
        )}`;
        this.checkingSpelling = false;
      })
      .catch(error => {
        console.error('Error checking spelling', error);
        this.checkingSpelling = false;
      });
  }

  private renderSpellCheckResultPiece(
    piece: SpellCheckerResultPiece
  ): TemplateResult {
    const formatBreakLines = (text: string) => {
      if (!this.textarea) return html`${text}`;
      return text.split('\n').map((line, index, lines) => {
        return index + 1 === lines.length ? html`${line}` : html`${line}<br />`;
      });
    };

    if (!piece.result) {
      return html`${formatBreakLines(piece.text)}`;
    }
    return html`
      <span class="spell-correction">
        <div class="text">${formatBreakLines(piece.text)}</div>
        <div class="tooltip">
          <div class="message">${piece.result.message}</div>
          <div class="suggestions">
            ${piece.result.suggestions.map(
              suggestion =>
                html`<div
                  @click="${evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    this.value =
                      this.value.substring(0, piece.result.from) +
                      suggestion +
                      this.value.substring(piece.result.to);
                    this.doSpellCheck();
                  }}"
                  class="suggestion"
                >
                  ${suggestion}
                </div>`
            )}
          </div>
          <div class="tail"></div>
        </div>
      </span>
    `;
  }

  public getParentModax(): Modax {
    let parent = this as HTMLElement;

    while (parent) {
      if (parent.parentElement) {
        parent = parent.parentElement;
      } else {
        parent = (parent as any).getRootNode().host;
      }

      if (!parent) {
        return null;
      }

      if (parent.tagName == 'TEMBA-MODAX') {
        return parent as Modax;
      }
    }
  }

  public getParentForm(): HTMLFormElement {
    let parent = this as HTMLElement;

    while (parent) {
      if (parent.parentElement) {
        parent = parent.parentElement;
      } else {
        parent = (parent as any).getRootNode().host;
      }

      if (!parent) {
        return null;
      }

      if (parent.tagName === 'FORM') {
        return parent as HTMLFormElement;
      }
    }
  }

  public click(): void {
    super.click();
    this.handleContainerClick();
  }

  private renderInputFieldOrDisplayField(input: TemplateResult) {
    if (this.spellCheckerMode === SpellCheckerMode.VIEW) {
      input = html`
        <p class="textinput-view" style="cursor: pointer;">
          ${this.spellCheckResults}
        </p>
      `;

      if (this.textarea) {
        input = html`
          <p class="textinput-view textarea-view" style="cursor: pointer;">
            ${this.spellCheckResults}
          </p>
        `;

        if (this.autogrow) {
          input = html` <div class="grow-wrap">
            <div>
              ${this.value.split('\n').map(line => html`${line}<br />`)}
            </div>
            ${input}
          </div>`;
        }
      }
    }
    return input;
  }

  public render(): TemplateResult {
    const containerStyle = {
      height: `${this.textarea ? '100%' : 'auto'}`,
    };

    const clear =
      this.clearable && this.inputElement && this.inputElement.value
        ? html` <temba-icon
            name="x"
            class="clear-icon"
            @click=${this.handleClear}
          />`
        : null;

    let input = html`
      <input
        class="textinput"
        name=${this.name}
        type="text"
        maxlength="${ifDefined(this.maxlength)}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        @blur=${this.handleBlur}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const input = this;

            if (this.submitOnEnter) {
              const parentModax = input.getParentModax();
              const parentForm = !parentModax ? input.getParentForm() : null;

              this.value = this.values[0];
              this.fireEvent('change');

              // if we don't have something to submit then bail
              if (!parentModax && !parentForm) {
                return false;
              }

              input.blur();

              // look for a form to submit
              window.setTimeout(function () {
                // first, look for a modax that contains us
                const modax = input.getParentModax();
                if (modax) {
                  input.blur();

                  modax.submit();
                } else {
                  // otherwise, just look for a vanilla submit button
                  const form = input.getParentForm();

                  if (form) {
                    const submitButton = form.querySelector(
                      "input[type='submit']"
                    ) as HTMLInputElement;
                    if (submitButton) {
                      submitButton.click();
                    } else {
                      form.submit();
                    }
                  }
                }
              }, 10);
              // this is needed for firefox, would be nice to
              // find a way to do this with a callback instead
            }
          }
        }}
        placeholder=${this.placeholder}
        .value=${this.value}
        .disabled=${this.disabled}
      />
    `;

    if (this.textarea) {
      input = html`
        <textarea
          class="textinput"
          name=${this.name}
          placeholder=${this.placeholder}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          .value=${this.value}
          .disabled=${this.disabled}
        ></textarea>
      `;

      if (this.autogrow) {
        input = html` <div class="grow-wrap">
          <div>${this.value.split('\n').map(line => html`${line}<br />`)}</div>
          ${input}
        </div>`;
      }
    }

    input = this.renderInputFieldOrDisplayField(input);

    return html`
      <temba-field
        name=${this.name}
        .label="${this.label}"
        .helpText="${this.helpText}"
        .errors=${this.errors}
        .widgetOnly=${this.widgetOnly}
        .hideLabel=${this.hideLabel}
        .disabled=${this.disabled}
      >
        <div
          class="input-container"
          style=${styleMap(containerStyle)}
          @click=${this.handleContainerClick}
        >
          ${input} ${clear}
          <slot></slot>
        </div>
      </temba-field>
    `;
  }
}
