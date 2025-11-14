<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { AtroposClass, defaultConfiguration, type AtroposConfiguration } from '../hooks/atropos'

const props = withDefaults(
  defineProps<{
    class?: string
    innerClassName?: string
    highlight?: boolean
    shadow?: boolean
    options?: AtroposConfiguration
  }>(),
  {
    class: '',
    innerClassName: '',
    highlight: false,
    shadow: false,
    options: () => defaultConfiguration
  }
)

const atroposInstanceRef = ref<InstanceType<typeof AtroposClass> | null>(null)
const mergedConfiguration = computed(() => ({ ...defaultConfiguration, ...props.options }))

const applyConfiguration = (configuration: AtroposConfiguration) => {
  if (atroposInstanceRef.value) {
    atroposInstanceRef.value.configuration = configuration
  }
}

onMounted(() => {
  if (!customElements.get('atropos-component')) {
    customElements.define('atropos-component', AtroposClass)
  }

  applyConfiguration(mergedConfiguration.value)
})

watch(
  () => mergedConfiguration.value,
  (configuration: AtroposConfiguration) => applyConfiguration(configuration),
  { deep: true, immediate: true }
)

onUnmounted(() => {
  const element =
    atroposInstanceRef.value ?? (document.querySelector('atropos-component') as AtroposClass | null)
  if (element) {
    element.disconnectedCallback()
  }
})
</script>

<template>
  <div>
    <atropos-component ref="atroposInstanceRef">
      <div :class="`atropos ${$props.class}`">
        <div class="atropos-scale">
          <div class="atropos-rotate">
            <div :class="`atropos-inner ${$props.innerClassName}`">
              <slot></slot>
              <div :class="`${$props.highlight ? 'atropos-highlight ' : ''}`"></div>
            </div>
            <div v-if="$props.shadow" class="atropos-shadow"></div>
          </div>
        </div>
      </div>
    </atropos-component>
  </div>
</template>

<style scoped>
@import 'atropos/css';
</style>
