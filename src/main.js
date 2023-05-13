import { svelte } from '@sveltejs/vite-plugin-svelte'
import cli from 'command-line-args'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'
import { build } from 'vite'
const file = fileURLToPath(import.meta.url)
// const dir = path.dirname(file).replace(/\\+/, '/')

const { uuid, contract, delay } = cli([
  { name: 'delay', alias: 'd', type: Number, defaultValue: 0 },
  { name: 'uuid', alias: 'u', type: String, defaultValue: '' },
  { name: 'contract', alias: 'c', type: String, defaultValue: '' },
])

if (!contract) {
  console.error(`Invalid contract name "${contract}".`)
  process.kill(22)
}

if (!fs.existsSync(contract)) {
  fs.mkdirSync(contract)
}

/** @param {string} uuid  */
async function bundle(uuid) {
  const root = path.resolve(process.cwd(), `${contract}/${uuid}`)
  await build({
      root: root,
      plugins: [svelte()],
      optimizeDeps: {
        exclude: ['svelte-routing'],
      },
      build: {
        outDir: 'dist',
        minify: true,
        emptyOutDir: false,
        rollupOptions: {
          output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`,
          },
        },
      },
  })
  process.stdout.write(root)
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

async function main() {
  process.stdout.write("OK\n");
  if (uuid) {
    await bundle(uuid)
  }
  reader.on('line', bundle)
}

console.log({ delay })

if (delay > 0) {
  console.log(`Delaying ${delay} milliseconds...`)
  setTimeout(main, delay)
} else {
  main()
}
