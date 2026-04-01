import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  ...tseslint.configs.recommended,
  prettierPlugin,
  {
    ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**'],
  },
);
