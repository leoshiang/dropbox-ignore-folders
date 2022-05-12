const process = require('process');

function 取得使用者主目錄() {
    return process.platform === 'win32' ? process.env.LOCALAPPDATA : process.env.HOME
}

module.exports = {
    取得使用者主目錄
}
