const fs = require('fs')
const rimraf = require('rimraf').sync
const ts = require('typescript')

fs.writeFileSync('src/main.ts', `import './foo'\n`)
if (fs.existsSync('src/bar.ts'))
    fs.unlinkSync('src/bar.ts')
rimraf('lib')

const program = ts.createWatchProgram(
    ts.createWatchCompilerHost('src/tsconfig.json', undefined, ts.sys)
)

program.getProgram().emit()

fs.writeFileSync('src/bar.ts', '')
fs.appendFileSync('src/main.ts', `import './bar'\n`)
