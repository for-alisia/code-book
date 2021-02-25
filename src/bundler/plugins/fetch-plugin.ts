import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCahe = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      /** Index.js case */
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        /** Check, if we cached this file before */
        const cachedResult = await fileCahe.getItem<esbuild.OnLoadResult>(args.path);
        /** If we have this file in cache, just return it */
        if (cachedResult) {
          return cachedResult;
        }
        return null;
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        /** If we don't have this file in cache, make a request to https://unpkg.com to get the current
         * file and the exact path to it
         */
        const { data, request } = await axios.get(args.path);

        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");

        const contents = `
              const style = document.createElement('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);
            `;

        /** Construct the result to return */
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        /** Save the result to IndexedDB in browser */
        await fileCahe.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        /** If we don't have this file in cache, make a request to https://unpkg.com to get the current
         * file and the exact path to it
         */
        const { data, request } = await axios.get(args.path);

        /** Construct the result to return */
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        /** Save the result to IndexedDB in browser */
        await fileCahe.setItem(args.path, result);

        return result;
      });
    },
  };
};
