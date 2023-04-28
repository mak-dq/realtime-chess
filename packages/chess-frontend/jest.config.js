"use strict";
exports.__esModule = true;
/* eslint-disable */
exports["default"] = {
    displayName: 'chess-frontend',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/packages/chess-frontend'
};
