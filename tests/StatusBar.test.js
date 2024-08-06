import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StatusBar from '../src/components/StatusBar.vue';

describe('StatusBar.vue', () => {
  function createWrapper(status, showingWatchlist) {
    return mount(StatusBar, {
      props: { status, showingWatchlist },
    });
  }
  it('renders the correct status when showingWatchlist is false', () => {
    const status = 'Fake status';
    const statusMessage = createWrapper(status, false).find(
      'span[role="status"]',
    );
    expect(statusMessage.exists()).toBe(true);
    expect(statusMessage.text()).toBe(status);
  });
  it('renders the correct status when showingWatchlist is true', () => {
    const status = 'Fake status';
    const statusMessage = createWrapper(status, true).find(
      'span[role="status"]',
    );
    expect(statusMessage.exists()).toBe(true);
    expect(statusMessage.text()).toBe(status);
  });
});
