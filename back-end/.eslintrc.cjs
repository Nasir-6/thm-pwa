module.exports = {
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
};

// ! IMPORTANT - If eslint red underlining in vscode doesn't work uninstall and reinstall the extension
// More advanced lint options: https://youtu.be/11jpa8e5jEQ?t=2929
// Overrides for tests: https://youtu.be/11jpa8e5jEQ?t=3147
