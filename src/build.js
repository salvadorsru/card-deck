import esbuild from 'esbuild'

try {
    await esbuild.build({
        entryPoints: ['src/component/index.js'],
        bundle: true,
        minify: true,
        outfile: 'dist/index.min.js',
        sourcemap: false,
    })

    await esbuild.build({
        entryPoints: ['src/component/emulate.js'],
        bundle: true,
        minify: true,
        outfile: 'dist/emulate.min.js',
        sourcemap: false,
    })

    await esbuild.build({
        entryPoints: ['src/component/style.css'],
        minify: true,
        outfile: 'dist/style.min.css',
        sourcemap: false,
    })

    await esbuild.build({
        entryPoints: ['src/component/index.js'],
        bundle: true,
        minify: true,
        outfile: 'demo/public/js/index.min.js',
        sourcemap: false,
    })
    
    await esbuild.build({
        entryPoints: ['src/component/emulate.js'],
        bundle: true,
        format: 'esm',
        minify: true,
        outfile: 'demo/public/js/emulate.min.mjs',
        sourcemap: false,
    })

    await esbuild.build({
        entryPoints: ['src/component/style.css'],
        minify: true,
        outfile: 'demo/public/css/style.min.css',
        sourcemap: false,
    })
} catch {
    process.exit(1)
}