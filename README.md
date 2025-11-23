# @hinzky/atropos-vue

Vue 3 wrapper around [Atropos](https://github.com/nolimits4web/atropos) packaged for pnpm projects. It exposes a configurable web-component powered instance plus a `<AtroposVue>` component that accepts all Atropos configuration options.

## Install

Choose your package manager:

```bash
# npm
npm install @hinzky/atropos-vue

# pnpm
pnpm add @hinzky/atropos-vue

# yarn
yarn add @hinzky/atropos-vue

# bun
bun add @hinzky/atropos-vue
```

Peer dependencies (must already exist in your project):

- `vue@^3.3.0`

## Usage

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@hinzky/atropos-vue/dist/style.css'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { AtroposVue } from '@hinzky/atropos-vue'
</script>

<template>
  <AtroposVue
    class="feature-card"
    :highlight="true"
    :scale="true"
    :rotate="true"
    :shadow="true"
    :options="{ activeOffset: 52, duration: 600 }"
  >
    <img data-atropos-offset="5" src="/card.png" />
  </AtroposVue>
</template>
```

### Component props

- `scale` – renders the `.atropos-scale` wrapper when `true` (default false)
- `rotate` – renders the `.atropos-rotate` wrapper when `true` (default false)
- `shadow` – renders the `.atropos-shadow` element when `true` (default false)

All wrapper props default to `true`, which matches the structure expected by Atropos. Disable any of them if you already provide the corresponding DOM structure in your slotted content.

## Build

Install dependencies and run the build with your preferred tool:

```bash
# npm
npm install
npm run build

# pnpm
pnpm install
pnpm build

# yarn
yarn install
yarn build

# bun
bun install
bun run build
```

`vue-tsc` generates the declaration files in `dist`. Extend the build script or add Vite/Rollup if you need transpiled output.
