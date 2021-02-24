import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');

const now = new Date();

const banner = `// Copyright (c) 2021-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// tinytowers ${version} build ${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()}`;

export default {
    input: './src/main.ts',
    output: {
        file: './dist/main.js',
        banner,
        name: 'TinyTowers',
        format: 'iife',
        sourcemap: false,
        intro: 'var global = window;',
    },
    plugins: [
        replace({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(true),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true),
        }),
        resolve({
            extensions: ['.ts', '.tsx'],
        }),
        commonjs({
            include: [
                'node_modules/eventemitter3/**',
                'node_modules/phaser/**',
            ],
            exclude: [
                'node_modules/phaser/src/polyfills/requestAnimationFrame.js',
            ],
            sourceMap: false,
            ignoreGlobal: true,
        }),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
};
