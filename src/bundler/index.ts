import * as esbuild from 'esbuild-wasm';

/** Plugins */
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  /** If there is no service yet, initialize it */
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  /** Bundle code from rawCode */
  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    return { code: result.outputFiles[0].text, err: '' };
  } catch (err) {
    return { err: err.message, code: '' };
  }
};

export default bundle;
