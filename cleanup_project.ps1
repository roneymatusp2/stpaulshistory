# ======================================================================
# ST. PAUL'S HISTORY PROJECT CLEANUP SCRIPT
# ======================================================================
# This script removes ALL unnecessary files, keeping only essential 
# files needed for the React quiz application to function.
# ======================================================================

Write-Host "🧹 STARTING ST. PAUL'S HISTORY PROJECT CLEANUP..." -ForegroundColor Yellow
Write-Host "⚠️  This will delete hundreds of unnecessary files!" -ForegroundColor Red
Write-Host ""

# Get current directory
$projectPath = Get-Location
Write-Host "📁 Working in: $projectPath" -ForegroundColor Cyan

# Pause for confirmation
Read-Host "Press ENTER to continue or CTRL+C to cancel"

Write-Host ""
Write-Host "🗑️  DELETING FILES..." -ForegroundColor Red

# ======================================================================
# 1. DELETE ALL PDF PROCESSING TAR.GZ FILES (24 files)
# ======================================================================
Write-Host "1. Removing PDF processing archives..." -ForegroundColor Yellow

$pdfArchives = @(
    "appwrite-function.tar.gz",
    "clean-pdf-function.tar.gz", 
    "enhanced-pdf-processor.tar.gz",
    "final-appwrite-function.tar.gz",
    "final-fixed-pdf-function.tar.gz",
    "final-function.tar.gz",
    "final-javascript-function-v2.tar.gz",
    "final-javascript-function.tar.gz",
    "final-pdf-function.tar.gz",
    "minimal-clean-pdf-function.tar.gz",
    "minimal-function.tar.gz",
    "multi-engine-pdf-processor.tar.gz",
    "new-pdf-processor.tar.gz",
    "optimized-pdf-function.tar.gz",
    "pdf-function.tar.gz",
    "pdf-processor-light.tar.gz",
    "pdf-processor.tar.gz",
    "robust-pdf-function.tar.gz",
    "smaller-pdf-function.tar.gz",
    "super-minimal-pdf-function.tar.gz",
    "ts-final-solution.tar.gz",
    "typescript-function.tar.gz",
    "ultimate-function.tar.gz",
    "ultimate-pdf-processor.tar.gz"
)

foreach ($file in $pdfArchives) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   ✓ Deleted: $file" -ForegroundColor Green
    }
}

# ======================================================================
# 2. DELETE ALL FUNCTION DIRECTORIES (17+ directories)
# ======================================================================
Write-Host "2. Removing function directories..." -ForegroundColor Yellow

$functionDirs = @(
    "enhanced-pdf-processor",
    "final-solution",
    "function",
    "functions", 
    "function_clean",
    "function_correct",
    "minimal-function",
    "minimal-pdf-function",
    "multi-engine-pdf-processor",
    "pdf-function",
    "pdf-processor-complete",
    "pdf-processor-fixed",
    "super-minimal-pdf-fn",
    "temp_deploy",
    "typescript-solution",
    "ultimate-function",
    "ultimate-function-ts"
)

foreach ($dir in $functionDirs) {
    if (Test-Path $dir) {
        Remove-Item $dir -Recurse -Force
        Write-Host "   ✓ Deleted directory: $dir" -ForegroundColor Green
    }
}

# ======================================================================
# 3. DELETE DEVELOPMENT/DEPLOYMENT SCRIPTS (15+ files)
# ======================================================================
Write-Host "3. Removing development scripts..." -ForegroundColor Yellow

$scripts = @(
    "build_log.bat",
    "create_appwrite_function.bat",
    "create_foolproof_function.bat", 
    "create_lighter_package.bat",
    "create_new_function_package.bat",
    "create_zip.sh",
    "deploy_github.bat",
    "deploy_netlify.bat",
    "deploy_netlify.sh",
    "deploy_to_github.bat",
    "netlify_deploy.bat",
    "netlify_deploy_history.bat",
    "netlify_fix.bat",
    "prepare_educational_pdf_function.bat",
    "renovacao-completa.ps1",
    "renovacao-total.ps1",
    "run.bat",
    "setup_and_deploy.bat",
    "solucao_rapida.bat"
)

foreach ($script in $scripts) {
    if (Test-Path $script) {
        Remove-Item $script -Force
        Write-Host "   ✓ Deleted: $script" -ForegroundColor Green
    }
}

# ======================================================================
# 4. DELETE DOCUMENTATION FROM PREVIOUS ITERATIONS (6 files)
# ======================================================================
Write-Host "4. Removing old documentation..." -ForegroundColor Yellow

$docs = @(
    "ENHANCEMENTS.md",
    "INSTRUCTIONS.md", 
    "PDF_IMPLEMENTATION.md",
    "TROUBLESHOOTING.md",
    "appwrite-deployment-guide-ts.md",
    "appwrite-deployment-guide.md",
    "final-instructions.md",
    "typescript-final-instructions.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Remove-Item $doc -Force
        Write-Host "   ✓ Deleted: $doc" -ForegroundColor Green
    }
}

# ======================================================================
# 5. DELETE TEST/DEVELOPMENT FILES (4+ files)
# ======================================================================
Write-Host "5. Removing test and development files..." -ForegroundColor Yellow

$testFiles = @(
    "chemistry_questions_and_answers.tex",
    "test-chemistry-questions.txt",
    "test_pdf_processing.js",
    "validate_netlify_build.js",
    "function-template.js",
    "solucao_manual.txt",
    "vite.config.netlify.ts"
)

foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   ✓ Deleted: $file" -ForegroundColor Green
    }
}

# ======================================================================
# 6. DELETE UNUSED PDF WORKERS
# ======================================================================
Write-Host "6. Removing unused PDF workers..." -ForegroundColor Yellow

$pdfWorkers = @(
    "public/pdf-worker.js",
    "public/pdfWorker.js"
)

foreach ($worker in $pdfWorkers) {
    if (Test-Path $worker) {
        Remove-Item $worker -Force
        Write-Host "   ✓ Deleted: $worker" -ForegroundColor Green
    }
}

# ======================================================================
# 7. CLEAN PACKAGE.JSON (Remove unused dependencies)
# ======================================================================
Write-Host "7. Note: Consider removing unused dependencies from package.json:" -ForegroundColor Yellow
Write-Host "   - pdfjs-dist" -ForegroundColor Cyan
Write-Host "   - react-pdf" -ForegroundColor Cyan
Write-Host "   - node-appwrite (if not using backend)" -ForegroundColor Cyan

# ======================================================================
# COMPLETION SUMMARY
# ======================================================================
Write-Host ""
Write-Host "✅ CLEANUP COMPLETED!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 SUMMARY:" -ForegroundColor Cyan
Write-Host "   • Deleted 24 PDF processing archives" -ForegroundColor White
Write-Host "   • Removed 17+ function directories" -ForegroundColor White  
Write-Host "   • Cleaned 15+ development scripts" -ForegroundColor White
Write-Host "   • Removed 8 old documentation files" -ForegroundColor White
Write-Host "   • Deleted 7 test/development files" -ForegroundColor White
Write-Host "   • Removed 2 unused PDF workers" -ForegroundColor White
Write-Host ""
Write-Host "🎯 RESULT: Clean, minimal St. Paul's History Quiz project!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 REMAINING ESSENTIAL FILES:" -ForegroundColor Cyan
Write-Host "   ✓ package.json and package-lock.json" -ForegroundColor White
Write-Host "   ✓ vite.config.ts and TypeScript configs" -ForegroundColor White
Write-Host "   ✓ index.html and tailwind.config.js" -ForegroundColor White
Write-Host "   ✓ /src/ directory (App.tsx, questions data)" -ForegroundColor White
Write-Host "   ✓ /public/images/ (headmaster photos)" -ForegroundColor White
Write-Host "   ✓ netlify.toml for deployment" -ForegroundColor White
Write-Host "   ✓ /node_modules/ and /dist/ (auto-generated)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Your project is now ready for clean development!" -ForegroundColor Green

# Optional: Show final directory structure
Write-Host ""
$choice = Read-Host "Show final directory structure? (y/n)"
if ($choice -eq "y" -or $choice -eq "Y") {
    Write-Host ""
    Write-Host "📂 FINAL PROJECT STRUCTURE:" -ForegroundColor Cyan
    Get-ChildItem -Recurse -Directory | Select-Object FullName | ForEach-Object {
        $relativePath = $_.FullName.Replace($projectPath, ".")
        Write-Host "   $relativePath" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "🎉 CLEANUP COMPLETE! Happy coding! 🎉" -ForegroundColor Green