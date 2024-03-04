import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import path from 'path'
import { fileURLToPath } from 'url'
const file = fileURLToPath(import.meta.url)
const dir = path.dirname(file).replace(/\\+/, '/')

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    minify: true,
  },
  resolve: {
    alias: {
      ':assets': `${path.resolve(dir, ':assets')}`,
      ':scripts': `${path.resolve(dir, 'src/lib/:scripts')}`,
      ':stores': `${path.resolve(dir, 'src/lib/:stores')}`,
      ':types': `${path.resolve(dir, 'src/lib/:types.js')}`,
      ':constants': `${path.resolve(dir, 'src/lib/:constants.js')}`,
    },
  },
  plugins: [
    //@ts-ignore
    ...VitePluginNode({
      // tell the plugin where is your project entry
      appPath: './src/main.js',

      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: 'app',

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild don't support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: 'esbuild',

      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {},
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optional dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exclude these optional dependencies:
    // exclude: [
    //   '@nestjs/microservices',
    //   '@nestjs/websockets',
    //   'cache-manager',
    //   'class-transformer',
    //   'class-validator',
    //   'fastify-swagger',
    // ],
  },
})
