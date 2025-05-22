import { defineConfig } from 'vite'
import { speedyJsxTransformPlugin } from 'vite-plugin-speedy-jsx'

export default defineConfig({
  plugins: [speedyJsxTransformPlugin()]
})
