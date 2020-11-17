import { fixture, expect, assert } from "@open-wc/testing";
import sinon from "sinon";
import Dialog from "./Dialog";

const getDialogHTML = (hideOnClick = false) => {
  return `
    <temba-dialog ${hideOnClick ? "hideOnClick" : ""}>
      <textarea name="comment"><textarea>
    </temba-dialog>
  `;
};

const open = async (dialog: Dialog) => {
  const clock = sinon.useFakeTimers();
  dialog.open = true;
  await dialog.updateComplete;

  // our dialog will animate onto the screen
  clock.tick(400);
  await dialog.updateComplete;

  // gain focus for first text input
  clock.tick(100);

  clock.restore();
};

const close = async (dialog: Dialog) => {
  const clock = sinon.useFakeTimers();
  dialog.open = false;
  await dialog.updateComplete;

  // tick forward for close to complete
  clock.tick(400);
};

describe("temba-dialog", () => {
  beforeEach(function () {});
  afterEach(function () {});

  it("can be created", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    assert.instanceOf(dialog, Dialog);
  });

  it("can be opened", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    await open(dialog);
    expect(dialog.ready).to.equal(true);
  });

  it("can be closed by attribute", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    await open(dialog);
    expect(dialog.ready).to.equal(true);

    dialog.open = false;
  });

  it("can be canceled", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    await open(dialog);
    expect(dialog.ready).to.equal(true);

    dialog.getCancelButton().click();
    expect(dialog.open).to.equal(false);
  });

  it("restricts and restores background scrolling", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    await open(dialog);
    const body = document.querySelector("body");
    expect(body.style.position).to.equal("fixed");

    close(dialog);
    dialog.getCancelButton().click();
    await dialog.updateComplete;
    expect(body.style.position).to.equal("");
  });

  it("focuses the first text input", async () => {
    const dialog: Dialog = await fixture(getDialogHTML());
    await open(dialog);

    const textarea = dialog.querySelector("textarea");
    expect(document.activeElement).to.equal(textarea);
  });

  it("hides on click", async () => {
    const dialog: Dialog = await fixture(getDialogHTML(true));
    await open(dialog);

    const mask: HTMLDivElement = dialog.shadowRoot.querySelector(
      "#dialog-mask"
    );
    mask.click();

    await dialog.updateComplete;
    expect(dialog.open).to.equal(false);
  });

  it("hides on escape", async () => {
    const dialog: Dialog = await fixture(getDialogHTML(true));
    await open(dialog);
    expect(dialog.open).to.equal(true);

    // simulate the escape key
    const element = dialog.shadowRoot.querySelector(".dialog-container");
    element.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
    expect(dialog.open).to.equal(false);
  });
});
