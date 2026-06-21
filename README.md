# 樂透隨機選號器

免安裝，直接用瀏覽器開啟的樂透選號工具。

---

## 線上使用（免下載）

**https://esert214.github.io/lotto/lotto.html**

直接開瀏覽器即可使用，手機也可用（iPhone 用 Safari 打開 → 分享鍵 → 加入主畫面，像原生 App 一樣全螢幕執行）。

---

## 檔案說明

| 檔案 | 說明 |
|------|------|
| `lotto.html` | 標準版 |
| `lotto-csv.html` | 標準版 + 歷史紀錄匯出 CSV |
| `data.json` | 冷熱號資料檔（可獨立更新，不需修改 HTML） |
| `fetch-latest.js` | 更新腳本（需要 Node.js） |
| `更新冷熱號.bat` | 雙擊即可執行更新（Windows 專用，免打指令） |
| `LottoApp/` | Android APK 原始碼（Android Studio 專案） |
| `LottoApp/切換圖示.bat` | 三種 App 圖示快速切換（彩球 / 鑽石 / 四葉草） |

---

## 支援遊戲

| 遊戲 | 規則 | 圖示顏色 |
|------|------|----------|
| **威力彩** | 第1區 01~38 選6碼 + 第2區 01~08 選1碼 | 紫色 + 金色 |
| **大樂透** | 01~49 選6碼 | 粉紅色 |
| **今彩539** | 01~39 選5碼 | 藍色 |

---

## 功能介紹

### 生成號碼
- **遊戲** — 下拉切換威力彩 / 大樂透 / 今彩539
- **組數** — 一次生成 1~10 組號碼
- **策略** — 四種選號模式
- **排除** — 輸入不想選的號碼（用逗號分隔）
- **生成** — 點擊按鈕隨機產生，號碼自動排序顯示

### 四種選號策略
- **完全隨機** — 每個號碼機率均等
- **偏熱門** — 根據歷史出現次數加權，常開號碼機率較高
- **偏冷門** — 冷門號碼機率較高
- **平衡模式** — 將號碼分為冷、溫、熱三群各取比例混合

### 歷史紀錄
- 每次生成自動儲存至瀏覽器（localStorage）
- 每筆可單獨刪除，一鍵清除全部
- 最多保留 100 筆（lotto-csv.html 另可匯出 CSV 檔案）

### 冷熱號參考表
- 切換遊戲時自動更新
- 顯示各遊戲全部歷史統計的熱門 / 冷門號碼
- 威力彩另顯示第2區冷熱號

---

## 如何更新

所有檔案皆可透過 Git 推送到 GitHub，GitHub Pages 會自動部署。

### 改功能
```bash
git add 改過的檔案
git commit -m "說明改了什麼"
git push
```
等約 1 分鐘，所有人重新整理瀏覽器就是新版。

### 改冷熱號資料
```bash
node fetch-latest.js
git add data.json
git commit -m "update hot/cold data"
git push
```

---

## Android APK 建置

**方法一：Android Studio（推薦）**
1. 開啟 `LottoApp/` 資料夾
2. Build → Build Bundle(s) / APK(s) → Build APK(s)

**方法二：命令列**
設定 JAVA_HOME 為 Android Studio 內建 JDK，然後：
```bash
cd LottoApp
gradlew assembleDebug
```
產出：`app/build/outputs/apk/debug/app-debug.apk`

APK 可直接傳給他人安裝，覆蓋安裝不遺失歷史紀錄資料。

---

## 免責聲明

本工具僅供參考娛樂，所有號碼皆為隨機產生，不保證中獎。彩票本質為機率遊戲，請量力而為，勿過度投注。
