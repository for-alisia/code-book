import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      const file = path.basename(filename);
      await serve(+options.port, file, dir);
      console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to start edit`);
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${options.port} in use. Try running on a different port (use -p or --port)`
        );
      } else {
        console.log('ERROR: ', err.message);
      }
      process.exit(1);
    }
  });
