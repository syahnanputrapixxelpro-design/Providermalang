const fs = require('fs');
const glob = require('fs').readdirSync('.');

const files = glob.filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'blog.html');
const assets = ['assets/1.webp', 'assets/2.webp', 'assets/3.webp', 'assets/4.webp', 'assets/5.webp', 'assets/6.webp', 'assets/7.webp', 'assets/8.webp', 'assets/Hero.webp', 'assets/TimBattle.webp', 'assets/areaforest.webp', 'assets/areaspeedball.webp', 'assets/areaurban.webp', 'assets/blog1.webp'];

let imgIdx = 0;

for (const filepath of files) {
    let content = fs.readFileSync(filepath, 'utf-8');

    // Author icon
    const authorRegex = /https:\/\/images\.unsplash\.com\/photo-1472099645785-5658abf4ff4e[^"'\s]*/g;
    content = content.replace(authorRegex, 'assets/1.webp');

    // Get all other external images
    const extRegex = /https:\/\/(?:images\.unsplash\.com|media\.giphy\.com)[^"'\s>)]+/g;
    const matches = content.match(extRegex) || [];
    const uniqueUrls = [...new Set(matches)];

    const urlMap = {};
    for (const url of uniqueUrls) {
        if (urlMap[url]) continue;
        urlMap[url] = assets[imgIdx % assets.length];
        imgIdx++;
    }

    for (const [url, replaceUrl] of Object.entries(urlMap)) {
        // Use split/join for string replace all
        content = content.split(url).join(replaceUrl);
    }

    fs.writeFileSync(filepath, content, 'utf-8');
}
console.log('Semua gambar dummy di artikel telah diganti dengan folder assets.');
