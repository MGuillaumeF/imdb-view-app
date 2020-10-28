module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  exampleMode : "expand",
  usageMode : "expand",
  styleguideDir: 'docs',
  ignore : ['**/index.tsx', '**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']
};
