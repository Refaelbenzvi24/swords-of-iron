/** @type {import("eslint").Linter.Config} */
const config = {
	root: true,
	extends: ['@acme/eslint-config'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		tsconfigRootDir: __dirname,
		project: [
			'./tsconfig.json',
			'./apps/*/tsconfig.json',
			'./packages/*/tsconfig.json',
			'./packages/modules/*/tsconfig.json'
		]
	},
	settings: {
		next: {
			rootDir: ['apps/nextjs']
		}
	}
}

module.exports = config
