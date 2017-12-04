const tsConfig = require('./tsconfig.json')
const package = require('./package.json')

module.exports = (wallaby) => {
  return {
    name: package.name,
    files: [
      'src/**/*.ts', 'src/**/*.tsx'
    ],

    tests: [
      'test/**/*.spec.ts', 'test/**/*.spec.tsx'
    ],
    
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript(tsConfig.compilerOptions)
    },
    
    preprocessors: {
      '**/*.js?(x)': f => (
        require('fs').unlinkSync(require('path').join(wallaby.projectCacheDir, f.path.replace('.js', '.ts'))), 
        f.content
      )
    },
    
    env: {
      type: 'browser',
      runner: 'chrome'
    },
    debug: true,
    testFramework: 'ava',
    delays: {
      run: 1000
    },
    slowTestThreshold: 500,
    lowCoverageThreshold: 85,
    reportUnhandledPromises: true
  }
}
