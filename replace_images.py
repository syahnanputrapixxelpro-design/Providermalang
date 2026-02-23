import glob
import re

files = glob.glob('*.html')
assets = ['assets/2.webp', 'assets/3.webp', 'assets/4.webp', 'assets/5.webp', 'assets/6.webp', 'assets/7.webp', 'assets/8.webp', 'assets/Hero.webp', 'assets/TimBattle.webp', 'assets/areaforest.webp', 'assets/areaspeedball.webp', 'assets/areaurban.webp', 'assets/blog1.webp']

files = [f for f in files if f not in ('index.html', 'blog.html')]
img_idx = 0

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    author_url_pattern = r'https://images\.unsplash\.com/photo-1472099645785-5658abf4ff4e[^"\'\s]*'
    content = re.sub(author_url_pattern, 'assets/1.webp', content)
    
    urls = re.findall(r'https://(?:images\.unsplash\.com|media\.giphy\.com)[^"\'\s>)]+', content)
    
    url_map = {}
    for url in set(urls):
        url_map[url] = assets[img_idx % len(assets)]
        img_idx += 1
        
    for url, repl in url_map.items():
        content = content.replace(url, repl)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")
