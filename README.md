# ignore-dropbox--folders
當我們在開發 node.js 和 c# 專案時，會產生 node_modules、 bin 和 obj 目錄。這些目錄檔案很多，而且在不同作業系統的電腦之間同步時，很容易發生錯誤。
當專案多的時候，要一個一個手動忽略資料夾會很麻煩。 為此，我寫了一個小工具可以批次設定要忽略的資料夾。

# 適用平台
* linux
* macOS
* Windows

# 注意事項

* Windows 必須安裝 PowerShell 才能正常執行。
* 若要將 node.js 編譯成執行檔，請安裝 pkg(https://www.npmjs.com/package/pkg)

# 使用方式

自動抓取 Dropbox 根目錄，並忽略底下所有的 node_modules、 bin 和 obj 目錄
```bash
dgxign-win --mode=i
```

自動抓取 Dropbox 根目錄，並取消忽略底下所有的 node_modules、 bin 和 obj 目錄（所有目錄會恢復同步）
```bash
dgxign-win --mode=s
```

自動抓取 Dropbox 根目錄，並忽略所有的 bin 和 build 目錄
```bash
dgxign-win --mode=s --regex=.*[\/\\](build|bin)$
```

忽略 C:\Dropbox\Projects 底下所有的 node_modules、 bin 和 obj 目錄
```bash
dgxign-win --home=C:\Dropbox\Projects
```

忽略 C:\Dropbox\Projects 底下所有的 node_modules、 bin 和 obj 目錄
```bash
dgxign-win --mode=s
```

# 參數
-c --cwd        使用目前目錄作為主目錄，不可以與 -h 同時使用。

-h --home       主目錄。如果沒有指定，程式會自動抓取 Dropbox 主目錄。

-m, --mode      模式。i=忽略資料夾，s=取消忽略資料夾

-r, --regex     正規表示式，用來判斷目錄是否需要被處理。預設值 .*[\/\\](node_modules|bin|obj)$ 表示結尾是 node_modules,bin,obj 的目錄會被處理。

-v, --verbose   顯示過程。
