import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

export default {
  title: 'Hello'
};

export const hello_button = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const emoji_button = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
