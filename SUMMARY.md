# LottoApp — 專案摘要

## 功能
- **威力彩** (01–38 選 6 球 + 01–08 選 1 球)
- **大樂透** (01–49 選 6 球)
- **今彩539** (01–39 選 5 球)
- 四種選號策略：完全隨機、偏熱門、偏冷門、平衡模式
- 排除號碼輸入、排序顯示、1–10 組生成
- 歷史紀錄（localStorage，可單筆刪除 / 清除全部）
- 冷熱號參考表（內建歷屆開獎頻率資料）
- 免責聲明（所有版本已加入）

## 產出檔案

### 網頁版（直接開瀏覽器使用）
| 檔案 | 說明 |
|------|------|
| `lotto.html` | 主程式 |
| `lotto-csv.html` | 主程式 + CSV 匯出按鈕 |
| `data.json` | 歷屆冷熱號頻率資料 |
| `fetch-latest.js` | Node.js 腳本，從 HAWO API 更新 data.json |
| `更新冷熱號.bat` | 雙擊執行，一鍵更新冷熱號資料 |
| `README.md` | 使用說明文件 |
| `SUMMARY.md` | 專案摘要 |
| `圖示預覽.html` | 三種圖示預覽 |

### Android 版
| 位置 | 說明 |
|------|------|
| `LottoApp/` | Android Studio 完整專案 |
| `LottoApp/app/` | WebView 包裝 + JavaScript Bridge |
| `LottoApp/app/src/main/assets/lotto.html` | Android 專用版（內建更新按鈕） |
| `LottoApp/app/src/main/assets/data.json` | 冷熱號資料 |
| `LottoApp/app/src/main/java/com/lottoapp/MainActivity.kt` | WebView + HAWO API 即時抓取 |
| `LottoApp/切換圖示.bat` | 三種圖示（彩球 / 鑽石 / 四葉草）快速切換 |

## GitHub Pages 部署
- 網址：https://esert214.github.io/lotto/lotto.html
- 推送 `git push` 後約 1 分鐘自動更新
- 任何人（包括 iPhone Safari 加入主畫面）打開網址即為最新版

## iOS 使用方式
不需要申請開發者帳號，iPhone 用 Safari 開啟 GitHub Pages 網址 → 分享鍵 → **加入主畫面**，即可像原生 App 全螢幕使用，功能完全正常。

## Build APK
**推薦：Android Studio → Build → Build APK(s)**
產出：`app/build/outputs/apk/debug/app-debug.apk`

## 技術細節
- HAWO API：`/api/lotto/overview`、`/api/powerball/overview`、`/api/539/overview`
- 資料結構：`{ success, data: { totalDraws, all, hot, cold } }`
- Android：minSdk 26 / targetSdk 34 / Kotlin + AGP 8.1.4
- 離線儲存：localStorage（WebView） / SharedPreferences（Android Bridge）
- 覆蓋安裝不遺失資料

## 開發紀錄
1. 先完成網頁版（純 HTML/CSS/JS，無伺服器需求）
2. data.json 獨立於 HTML，更新不影響程式
3. 因 HAWO API 無 CORS header，Node.js 腳本處理更新
4. Android WebView 方案繞過 CORS（原生 HTTP 無同源限制）
5. AppBridge（@JavascriptInterface）串接 JS 與 Kotlin
6. 修正 WebChromeClient 支援 confirm() 對話框
7. 加入三種 App 圖示（彩球 / 鑽石 / 四葉草），可透過批次檔切換
8. 部署至 GitHub Pages，Git push 即自動更新
9. 加入免責聲明（所有版本：網頁版、CSV 版、Android 版）
