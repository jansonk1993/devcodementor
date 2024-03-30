// file_backup_tool.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 备份源目录和目标目录
const sourceDirectory = '/path/to/source';
const targetDirectory = '/path/to/backup';

// 每日备份文件
function backupFiles() {
    const date = new Date();
    const backupDirectory = path.join(targetDirectory, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    if (!fs.existsSync(backupDirectory)) {
        fs.mkdirSync(backupDirectory, { recursive: true });
    }

    exec(`cp -r ${sourceDirectory} ${backupDirectory}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`备份文件时出错: ${error}`);
            return;
        }
        console.log(`备份成功: ${sourceDirectory} => ${backupDirectory}`);
    });
}

// 每天定时备份
setInterval(backupFiles, 24 * 60 * 60 * 1000);
