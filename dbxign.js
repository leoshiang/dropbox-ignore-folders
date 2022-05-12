const fs = require('fs')
const path = require('path')
const dropbox = require('./dropbox')
const process = require("process");
const {program} = require('commander');

const 取消忽略資料夾 = 's'
const 忽略資料夾 = 'i'
let 參數
let 正規表示式

初始化參數()
剖析參數()
顯示參數()
處理目錄(參數.home)

//--- END ---

function 初始化參數() {
    program
        .option('-h, --home <home>', 'Dropbox 主目錄，如果沒有指定，程式會自動判斷。')
        .option('-c, --cwd', '使用目前目錄。')
        .option('-v, --verbose', '有指定此參數時會顯示處理的過程。', true)
        .option('-m, --mode <mode>', `模式，${忽略資料夾}=忽略資料夾，${取消忽略資料夾}=取消忽略資料夾。`, 忽略資料夾)
        .option('-r, --regex <正規表示式>', '用來判斷目錄是否符合條件的正規表示式，預設值 .*[\\/\\\\](node_modules|bin|obj)$', '.*[\\/\\\\](node_modules|bin|obj)$');
    program.parse(process.argv);
    參數 = program.opts()
}

function 剖析參數() {
    // 解析 --mode
    if (參數.mode !== 取消忽略資料夾 && 參數.mode !== 忽略資料夾) {
        console.log(`參數 --mode 只能是 ${取消忽略資料夾} 或 ${忽略資料夾}。`)
        process.exit(1)
    }

    if (參數.home && 參數.cwd) {
        console.log(`參數 -c 與 -h 不能共用。`)
        process.exit(1)
    }

    // 解析 --home
    if (參數.home) {
        if (!fs.existsSync(參數.home)) {
            console.log(`參數 -h 所指定的目錄 ${參數.home} 不存在`)
            process.exit(1)
        }
    } else {
        if (參數.cwd) {
            參數.home = process.cwd()
        } else {
            參數.home = dropbox.取得主目錄()
        }
    }

    // 解析 --regex
    正規表示式 = new RegExp(參數.regex);
}

function 顯示參數() {
    console.log(`主目錄：${參數.home}`)
    console.log(`模式：${參數.mode}`)
    console.log(`表示式：${參數.regex}`)
}

function 處理目錄(目錄) {
    if (目錄.endsWith('.dropbox.cache')) return
    fs.readdirSync(目錄)
        .map(x => 目錄 + path.sep + x)
        .filter(x => 是目錄(x))
        .forEach(x => 處理檔案(x))
}

function 處理檔案(檔案路徑) {
    let mark = '✔'
    try {
        if (!正規表示式.test(檔案路徑)) {
            處理目錄(檔案路徑)
            return
        }
        if (參數.mode === 忽略資料夾) {
            dropbox.忽略目錄(檔案路徑)
        } else {
            dropbox.取消忽略目錄(檔案路徑)
        }
    } catch (e) {
        mark = '✘'
    }
    if (參數.verbose) process.stdout.write(`[${mark}] ${檔案路徑}\r\n`)
}

function 是目錄(檔案路徑) {
    const stat = fs.statSync(檔案路徑)
    return stat && stat.isDirectory()
}
