import { fixture, assert } from '@open-wc/testing';
import { Completion } from '../src/completion/Completion';
import './utils.test';

export const getHTML = () => {
  return `<temba-completion></temba-completion>`;
};

describe('temba-completion', () => {
  beforeEach(() => {});
  afterEach(() => {});

  it('can be created', async () => {
    const completion: Completion = await fixture(getHTML());
    assert.instanceOf(completion, Completion);
  });
});
