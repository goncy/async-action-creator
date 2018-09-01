const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  "root": true,
  "extends": [
    "standard",
    "prettier",
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "prettier",
    "flowtype"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
  },
  "rules": {
    'no-debugger': IS_PRODUCTION ? 'error' : 'off',
    'no-console': IS_PRODUCTION ? 'error' : 'off',
    "prettier/prettier": [
      "error",
      {
        "semi": true
      }
    ]
  }
}
