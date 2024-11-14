import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Nokora', sans-serif` },
        body: { value: `'Nokora', sans-serif` },
      },
    },
    layerStyles: {
      fill: {
        solid: { value: 'orange' },
        muted: { value: 'orange' },
        subtle: { value: 'orange' },
        surface: { value: 'orange' },
      },
    },
    semanticTokens: {
      colors: {
        fg: { value: 'black' },
      },
    },
  },
});
