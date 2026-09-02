const { spawnSync } = require('child_process');
const path = require('path');

const positionalName = process.argv
  .slice(2)
  .find((arg) => arg && !arg.startsWith('-'));
const name = positionalName || process.env.npm_config_name;

if (!name || name === 'true') {
  console.error(
    'Informe o nome da migration:\n' +
      '  npm run migration:create --name=CreateUsersTable\n' +
      '  npm run migration:create -- CreateUsersTable',
  );
  process.exit(1);
}

const target = path.posix.join('src/db/migrations', name);
const result = spawnSync(
  process.execPath,
  [
    require.resolve('ts-node/dist/bin.js'),
    require.resolve('typeorm/cli.js'),
    'migration:create',
    target,
  ],
  { stdio: 'inherit', cwd: path.join(__dirname, '..') },
);

process.exit(result.status ?? 1);
