module.exports = {
    "extends": ["standard", "plugin:react-hooks/recommended", "eslint-config-prettier", "plugin:react/recommended"],
    "plugins": [
        "react", "prettier"
	],
	rules: {
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/require-default-props": "off",
		"prettier/prettier": "error",
	},
	"globals": {
		"sessionStorage": true,
	}
};