const fs = require("fs");
const path = require("path");
const process = require("process");
const {execSync} = require("child_process");
const platformTools = require('./platform-tools')

function 忽略目錄(目錄) {
    let command = ''
    let option = {}
    switch (process.platform) {
        case 'win32':
            command = `Set-Content -Path "${目錄}" -Stream com.dropbox.ignored -Value 1`
            option = {'shell': 'powershell.exe'}
            break
        case 'darwin':
            command = `xattr -w com.dropbox.ignored 1 "${目錄}"`
            break
        case 'linux':
            command = `attr -s com.dropbox.ignored -V 1 "${目錄}"`
            break
        default:
            throw new Error(`不支援的平台 ${process.platform}`)
    }

    execSync(command, option, 顯示錯誤)
}

function 取消忽略目錄(目錄) {
    let command = ''
    switch (process.platform) {
        case 'win32':
            command = `Clear-Content -Path "${目錄}" -Stream com.dropbox.ignored`
            break
        case 'darwin':
            command = `xattr -d com.dropbox.ignored "${目錄}"`
            break
        case 'linux':
            command = `attr -r com.dropbox.ignored "${目錄}"`
            break
        default:
            throw new Error(`不支援的平台 ${process.platform}`)
    }

    execSync(command, option, 顯示錯誤)
}

function 顯示錯誤(錯誤物件) {
    console.error(錯誤物件)
}

function 取得主目錄() {
    return 讀取設定檔().personal.path
}

function 讀取設定檔() {
    return JSON.parse(fs.readFileSync(取得設定檔名稱(), 'utf8'))
}

function 取得設定檔名稱() {
    return platformTools.取得使用者主目錄() + 取得主資料夾路徑() + path.sep + 'info.json'
}

function 取得主資料夾路徑() {
    switch (process.platform) {
        case 'linux':
        case 'darwin':
            return '/.dropbox';
        case 'win32':
            return '\\Dropbox';
        default:
            console.log(`不支援的平台 ${process.platform}`);
    }
}

module.exports = {
    取得主目錄,
    讀取設定檔,
    取得設定檔名稱,
    取得主資料夾路徑,
    忽略目錄: 忽略目錄,
    取消忽略目錄: 取消忽略目錄
}
