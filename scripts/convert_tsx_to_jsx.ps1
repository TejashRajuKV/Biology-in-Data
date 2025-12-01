# Converts tracked .tsx files to .jsx and removes typical TypeScript type annotations
# Run from repo root

$files = git ls-files "*.tsx" "src/**/*.tsx" 2> $null
if (-not $files) { Write-Output "No .tsx files found to convert"; exit }

foreach ($f in $files -split "\n") {
    $f = $f.Trim()
    if (-not $f) { continue }
    Write-Output "Converting: $f"
    $new = [System.IO.Path]::ChangeExtension($f, '.jsx')
    git mv $f $new

    $text = Get-Content -Raw -Encoding UTF8 $new

    # Remove 'import type' lines entirely
    $text = [Regex]::Replace($text, "(?m)^import\s+type\s+[^;]+;\s*\n?", "")

    # Remove 'type' specifier inside import braces (e.g., import { x, type Y } from '..')
    $text = [Regex]::Replace($text, "(?<=\{[^}]*),?\s*type\s+([^,}]+)(?=[,}])", "", [System.Text.RegularExpressions.RegexOptions]::None)

    # Remove TypeScript parameter type annotations like '}: SomeType)'
    $text = [Regex]::Replace($text, "\}\s*:\s*[^)\n]+\)", "})")

    # Remove TypeScript return type annotations for functions: ') : Type {' => ') {'
    $text = [Regex]::Replace($text, "\)\s*:\s*[^\{\n]+\{", ") {")

    # Remove 'as const' and other 'as Type' occurrences - convert ' as SomeType' to ''
    $text = [Regex]::Replace($text, "\s+as\s+[^;\n]+", "")

    # Remove 'export type' and 'type' or 'interface' declarations (best-effort)
    $text = [Regex]::Replace($text, "(?ms)^export\s+(type|interface)\s+[^\{\n]+\{.*?\}\s*", "")
    $text = [Regex]::Replace($text, "(?ms)^type\s+[^\{\n]+\{.*?\}\s*", "")

    # Remove leftover ': React.FC<...>' variable annotations and other ': Type' before '='
    $text = [Regex]::Replace($text, "\:\s*[^=\n\)]+(?=\=)", "")

    # Replace any remaining '.tsx' import references to '.jsx'
    $text = $text -replace '\.tsx\"', '.jsx"'
    $text = $text -replace "\.tsx'", ".jsx'"

    Set-Content -Path $new -Value $text -Encoding UTF8
}

Write-Output "Conversion complete. Please review changes and run tests/build."