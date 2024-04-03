import { html, fixture, expect } from '@open-wc/testing';
import { TembaDate } from '../src/date/TembaDate';
import {
  assertScreenshot,
  getClip,
  getComponent,
  loadStore,
  mockNow,
} from './utils.test';

const TAG = 'temba-date';

export const getDate = async (attrs: any = {}) => {
  attrs['width'] = 100;
  return (await getComponent(TAG, attrs)) as TembaDate;
};

mockNow('2022-12-02T21:00:00.000000-07:00');

describe('temba-date', () => {
  beforeEach(() => {
    loadStore();
  });

  it('renders default', async () => {
    const date = await getDate({ value: '1978-11-18T02:22:00.000000-07:00' });
    const dateString = (
      date.shadowRoot.querySelector('.date') as HTMLSpanElement
    ).innerText;

    await assertScreenshot('date/date', getClip(date));
    expect(dateString).to.equal('11/18/1978');
  });

  it('renders duration', async () => {
    const date = await getDate({
      value: '1978-11-18T02:22:00.000000-07:00',
      display: 'duration',
    });
    const dateString = (
      date.shadowRoot.querySelector('.date') as HTMLSpanElement
    ).innerText;

    await assertScreenshot('date/duration', getClip(date));
    expect(dateString).to.equal('44 years ago');
  });

  it('renders datetime', async () => {
    const date = await getDate({
      value: '1978-11-18T02:22:00.000000-07:00',
      display: 'datetime',
    });
    const dateString = (
      date.shadowRoot.querySelector('.date') as HTMLSpanElement
    ).innerText;

    await assertScreenshot('date/datetime', getClip(date));
    expect(dateString).to.equal('11/18/1978, 9:22 AM');
  });

  it('renders inline', async () => {
    const el: HTMLElement = await fixture(html`
      <span
        >Your birthday is
        <temba-date value="1978-11-18T02:22:00.000000-07:00"></temba-date
        >!</span
      >
    `);

    await assertScreenshot('date/date-inline', getClip(el));
  });
});
