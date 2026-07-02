const path = require('node:path');

const {
  getGymConfig,
  getVIPSummary,
} = require('./index');

async function main() {
  const config = getGymConfig();

  console.log('========================================');
  console.log(`🏋️  歡迎來到 ${config.gymName}`);
  console.log(`👤 今日管理員：${config.adminName}`);
  console.log('========================================');

  const membersPath = config.defaultMembersPath
    || path.join(__dirname, 'fixtures', 'members.json');

    try {
    const summary = await getVIPSummary(membersPath);

    console.log("");
    console.log("📊 VIP 會員統計");
    console.log(`   人數：${summary.count}`);
    console.log(`   總點數：${summary.totalCredits}`);
    console.log(`   名單：${summary.names.join("、")}`);
    console.log("");
  } catch (error) {
    console.log(`無法取得會員統計資料，檔案路徑：${membersPath}\n錯誤代碼：${error.name}，錯誤訊息：${error.message}`);
  }
}

main();
