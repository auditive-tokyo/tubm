const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Nunjucksの設定
nunjucks.configure('_includes', {
    autoescape: true
});

// HTMLファイルを再帰的に処理する関数
function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !file.startsWith('_')) {  // _includesディレクトリをスキップ
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            // HTMLファイルの内容を読み込み
            const content = fs.readFileSync(fullPath, 'utf8');

            // {% include ... %} タグを実際のコンテンツに置換
            const result = content
                .replace(/{%\s*include\s*"_includes\/header\.njk"\s*%}/, nunjucks.render('header.njk'))
                .replace(/{%\s*include\s*"_includes\/beforebodyclose\.njk"\s*%}/, nunjucks.render('beforebodyclose.njk'));

            // 結果を保存
            fs.writeFileSync(fullPath, result);
        }
    });
}

// 処理開始
processDirectory('.');  // カレントディレクトリから開始