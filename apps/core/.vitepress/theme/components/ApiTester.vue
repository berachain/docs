<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // The endpoint path (e.g. "/health" or "/wallets/{wallet}/rewards")
  endpoint: {
    type: String,
    required: true
  },
  // HTTP method (GET, POST, etc)
  method: {
    type: String,
    default: 'GET'
  },
  // Path parameters definition array [{name: 'wallet', description: 'Wallet address'}]
  pathParams: {
    type: Array,
    default: () => []
  },
  // Query parameters definition array [{name: 'limit', description: 'Number of results', required: false}]
  queryParams: {
    type: Array,
    default: () => []
  },
  // Whether to show the network selector
  showNetworkSelect: {
    type: Boolean,
    default: true
  },
  // New prop for example values by network and param
  examples: {
    type: Object,
    default: () => ({})
    // Format:
    // {
    //   bepolia: { paramName: 'example value' },
    //   mainnet: { paramName: 'example value' }
    // }
  },
  // New prop for networks configuration
  networks: {
    type: Array,
    required: true,
    // Each network should have: { name: string, url: string, id: string }
  }
})

const selectedNetwork = ref(props.networks[0])
const response = ref(null)
const loading = ref(false)
const error = ref(null)
const paramValues = ref({})
const copySuccess = ref('')

// Initialize parameter values
props.pathParams.forEach(param => {
  paramValues.value[param.name] = ''
})
props.queryParams.forEach(param => {
  paramValues.value[param.name] = ''
})

const baseUrl = computed(() => selectedNetwork.value.url)

// Compute the final URL with parameters replaced
const finalUrl = computed(() => {
  let url = props.endpoint
  
  // Replace path parameters
  props.pathParams.forEach(param => {
    url = url.replace(`{${param.name}}`, paramValues.value[param.name] || `{${param.name}}`)
  })
  
  // Add query parameters
  const queryParams = props.queryParams
    .filter(param => paramValues.value[param.name])
    .map(param => `${param.name}=${encodeURIComponent(paramValues.value[param.name])}`)
  
  // Add the query string to the URL
  return `${baseUrl.value}${url}${queryParams.length ? '?' + queryParams.join('&') : ''}`
})

const isValid = computed(() => {
  // Check if all required path parameters are filled
  const pathParamsValid = props.pathParams
    .every(param => paramValues.value[param.name])
  
  // Check if all required query parameters are filled
  const queryParamsValid = props.queryParams
    .filter(param => param.required)
    .every(param => paramValues.value[param.name])
    
  return pathParamsValid && queryParamsValid
})

// Get example value for current network and parameter
const getExample = (paramName) => {
  const networkId = selectedNetwork.value.id
  return props.examples[networkId]?.[paramName] || ''
}

// Copy example value to parameter
const useExample = (paramName) => {
  const example = getExample(paramName)
  if (example) {
    paramValues.value[paramName] = example
    copySuccess.value = paramName
    setTimeout(() => {
      if (copySuccess.value === paramName) {
        copySuccess.value = ''
      }
    }, 2000)
  }
}

async function testEndpoint() {
  loading.value = true
  error.value = null
  response.value = null
  
  try {
    const res = await fetch(finalUrl.value, {
      method: props.method
    })
    response.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="api-tester">
    <div v-if="showNetworkSelect" class="network-selector">
      <label for="network">Network:</label>
      <select 
        id="network" 
        v-model="selectedNetwork"
        class="network-select"
      >
        <option 
          v-for="network in networks" 
          :key="network.url"
          :value="network"
          :disabled="network.disabled"
        >
          {{ network.name }}{{ network.disabled ? ' (coming soon)' : '' }}
        </option>
      </select>
    </div>

    <!-- Path Parameters -->
    <div v-if="pathParams.length > 0" class="params-section">
      <h4>Path Parameters</h4>
      <div 
        v-for="param in pathParams" 
        :key="param.name"
        class="param-input"
      >
        <label :for="param.name">{{ param.name }}:</label>
        <div class="input-with-example">
          <input 
            :id="param.name"
            v-model="paramValues[param.name]"
            :placeholder="param.description"
            class="param-field"
          />
          <button 
            v-if="getExample(param.name)"
            @click="useExample(param.name)"
            class="example-button"
            :class="{ 'success': copySuccess === param.name }"
            :title="getExample(param.name)"
          >
            <span v-if="copySuccess === param.name">✓</span>
            <span v-else>←📄</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Query Parameters -->
    <div v-if="queryParams.length > 0" class="params-section">
      <h4>Query Parameters</h4>
      <div 
        v-for="param in queryParams" 
        :key="param.name"
        class="param-input"
      >
        <label :for="param.name">{{ param.name }}:</label>
        <div class="input-with-example">
          <input 
            :id="param.name"
            v-model="paramValues[param.name]"
            :placeholder="param.description"
            class="param-field"
          />
          <button 
            v-if="getExample(param.name)"
            @click="useExample(param.name)"
            class="example-button"
            :class="{ 'success': copySuccess === param.name }"
            :title="getExample(param.name)"
          >
            <span v-if="copySuccess === param.name">✓</span>
            <span v-else>📋</span>
          </button>
          <span v-if="param.required" class="required">*</span>
        </div>
      </div>
    </div>

    <div class="endpoint-test">
      <button 
        @click="testEndpoint"
        :disabled="loading || !isValid"
        class="test-button"
      >
        {{ loading ? 'Testing...' : 'Try it' }}
      </button>

      <div v-if="response" class="response">
        <h4>Response:</h4>
        <pre><code>{{ JSON.stringify(response, null, 2) }}</code></pre>
      </div>

      <div v-if="error" class="error">
        <h4>Error:</h4>
        <pre><code>{{ error }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-tester {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.9em;
}

.network-selector {
  margin-bottom: 1rem;
}

.network-select {
  margin-left: 0.5rem;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.params-section {
  margin: 1rem 0;
}

.params-section h4 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.param-input {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  gap: 0.5rem;
}

.input-with-example {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.param-field {
  flex: 1;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.example-button {
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.example-button:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.example-button.success {
  background: var(--vp-c-green-dimm-2);
  color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-dimm-3);
}

.required {
  color: var(--vp-c-red-1);
  margin-left: 0.2rem;
}

.endpoint-test {
  margin-top: 1rem;
  text-align: right;
}

.test-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
}

.test-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.response, .error {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: left;
}

.response {
  background: var(--vp-c-bg-soft);
}

.error {
  background: var(--vp-c-red-dimm-2);
  color: var(--vp-c-red-1);
}

pre {
  margin: 0;
  white-space: pre-wrap;
}

.network-select option:disabled {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style> 