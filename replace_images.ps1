$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @("index.html", "blog.html") }
$assets = @('assets/2.webp', 'assets/3.webp', 'assets/4.webp', 'assets/5.webp', 'assets/6.webp', 'assets/7.webp', 'assets/8.webp', 'assets/Hero.webp', 'assets/TimBattle.webp', 'assets/areaforest.webp', 'assets/areaspeedball.webp', 'assets/areaurban.webp', 'assets/blog1.webp')
$idx = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Author
    $content = $content -replace 'https://images\.unsplash\.com/photo-1472099645785-5658abf4ff4e[^"''\s>)]*', 'assets/1.webp'
    
    # Matches
    $extRegex = 'https://(?:images\.unsplash\.com|media\.giphy\.com)[^"''\s>)]+'
    $matches = [regex]::Matches($content, $extRegex) | Select-Object -ExpandProperty Value -Unique
    
    foreach ($url in $matches) {
        if ($url -match "1472099645785-5658abf4ff4e") { continue }
        $replacement = $assets[$idx % $assets.Count]
        $content = $content.Replace($url, $replacement)
        $idx++
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host ("Updated: " + $file.Name)
}
