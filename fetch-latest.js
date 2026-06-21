/**
 * 樂透冷熱號資料更新腳本
 * 從 HAWO 樂透分析工具 API 擷取最新冷熱號資料
 *
 * 使用方法：
 *   node fetch-latest.js
 *
 * 會自動更新 data.json，無需手動修改任何檔案
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://lotto.hawo.tw';

const GAMES = [
  { key: 'super', name: '威力彩', api: '/api/powerball/overview' },
  { key: 'lotto', name: '大樂透', api: '/api/lotto/overview' },
  { key: 'daily', name: '今彩539', api: '/api/539/overview' },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 100)}`));
        } else {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error('JSON parse error')); }
        }
      });
    }).on('error', reject);
  });
}

function extractAllFreq(allArray) {
  const freq = {};
  allArray.forEach(item => { freq[item.number] = item.count; });
  return freq;
}

async function main() {
  console.log('正在擷取最新樂透冷熱號資料...\n');

  const now = new Date();
  const dateStr = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

  const output = {
    updated: dateStr,
    totalPeriods: {},
    games: {},
  };

  for (const game of GAMES) {
    process.stdout.write(`  ${game.name}... `);
    try {
      const raw = await fetchJSON(API_BASE + game.api);
      const data = raw.data;
      if (!data) throw new Error('no data field');

      output.totalPeriods[game.key] = data.totalDraws || 0;

      const gameData = { name: game.name };
      const zoneInfo = (game.key === 'super') ? data.zone1 : data;
      gameData.zone1Range = game.key === 'super' ? [1, 38] : game.key === 'lotto' ? [1, 49] : [1, 39];
      gameData.zone1Count = game.key === 'daily' ? 5 : 6;

      if (zoneInfo.all && zoneInfo.all.length > 0) {
        gameData.allFreq = extractAllFreq(zoneInfo.all);
      }

      if (zoneInfo.hot && zoneInfo.hot.length > 0) {
        const hotKey = game.key === 'daily' ? 'hot5' : 'hot6';
        gameData[hotKey] = zoneInfo.hot.slice(0, game.key === 'daily' ? 5 : 6).map(n => n.number);
      }

      if (zoneInfo.cold && zoneInfo.cold.length > 0) {
        const coldKey = game.key === 'daily' ? 'cold5' : 'cold6';
        gameData[coldKey] = zoneInfo.cold.slice(0, game.key === 'daily' ? 5 : 6).map(n => n.number);
      }

      if (game.key === 'super') {
        gameData.zone2Range = [1, 8];
        gameData.zone2Count = 1;
        gameData.hotZone2 = (data.zone2?.hot || []).slice(0, 6).map(n => n.number);
        gameData.coldZone2 = (data.zone2?.cold || []).slice(0, 6).map(n => n.number);
        if (data.zone2?.all) {
          gameData.allFreqZone2 = extractAllFreq(data.zone2.all);
        }
      }

      output.games[game.key] = gameData;
      console.log(`OK (${data.totalDraws} 期)`);
    } catch (e) {
      console.log('失敗:', e.message);
      console.log('  保留原有資料');
    }
  }

  const jsonPath = path.join(__dirname, 'data.json');
  const jsonStr = JSON.stringify(output, null, 2);

  if (fs.existsSync(jsonPath)) {
    const old = fs.readFileSync(jsonPath, 'utf8');
    if (old === jsonStr) {
      console.log('\n資料無變更，已是最新版。');
      return;
    }
  }

  fs.writeFileSync(jsonPath, jsonStr, 'utf8');
  console.log(`\n已更新 data.json（${dateStr}）`);
}

main().catch(e => {
  console.error('更新失敗:', e.message);
  process.exit(1);
});
