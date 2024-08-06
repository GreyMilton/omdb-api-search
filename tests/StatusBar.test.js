import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StatusBar from '../src/components/StatusBar.vue';

describe('StatusBar.vue', () => {
  function createWrapper(status, showingWatchlist) {
    return mount(StatusBar, {
      props: { status, showingWatchlist },
    });
  }
  describe('with showingWatchlist false', () => {
    it('renders the correct status', () => {
      const status = 'Fake status';
      const statusMessage = createWrapper(status, false).find(
        'span[role="status"]',
      );
      expect(statusMessage.exists()).toBe(true);
      expect(statusMessage.text()).toBe(status);
    });
    it('renders button text "View watchlist"', () => {
      const button = createWrapper('Fake status', false).find('button');
      expect(button.text()).toBe('View watchlist');
    });
    it('emits toggle-watchlist event when button is clicked', () => {
      const wrapper = createWrapper('Fake status', false);

      wrapper
        .find('button')
        .trigger('click')
        .then(() => {
          expect(wrapper.emitted('toggle-watchlist')).toBeTruthy();
        });
    });
  });
  describe('with showingWatchlist true', () => {
    it('renders the correct status', () => {
      const status = 'Fake status';
      const statusMessage = createWrapper(status, true).find(
        'span[role="status"]',
      );
      expect(statusMessage.exists()).toBe(true);
      expect(statusMessage.text()).toBe(status);
    });
    it('renders button text "Close watchlist"', () => {
      const button = createWrapper('Fake status', true).find('button');
      expect(button.text()).toBe('Close watchlist');
    });
    it('emits toggle-watchlist event when button is clicked', () => {
      const wrapper = createWrapper('Fake status', true);

      wrapper
        .find('button')
        .trigger('click')
        .then(() => {
          expect(wrapper.emitted('toggle-watchlist')).toBeTruthy();
        });
    });
  });
});
