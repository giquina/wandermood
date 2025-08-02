#!/bin/bash

# GitHub Auto-Commit Claude Hook
# Automatically commits code to GitHub ONLY when:
# - Code executes without syntax or build errors
# - No validation issues are detected
# - Does NOT trigger dev servers or processes

set -e

echo "🔍 Running auto-commit validation checks..."

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "❌ Error: Not in a git repository"
        exit 1
    fi
}

# Function to check for staged changes
check_staged_changes() {
    if git diff --cached --quiet; then
        echo "ℹ️  No staged changes found. Staging all changes..."
        git add .
        
        # Check again after staging
        if git diff --cached --quiet; then
            echo "ℹ️  No changes to commit"
            exit 0
        fi
    fi
}

# Function to run syntax checks
check_syntax() {
    echo "🔧 Running syntax checks..."
    
    # TypeScript compilation check (if tsconfig.json exists)
    if [ -f "tsconfig.json" ]; then
        echo "- Checking TypeScript compilation..."
        if ! npx tsc --noEmit --skipLibCheck 2>/dev/null; then
            echo "❌ TypeScript compilation failed"
            return 1
        fi
        echo "✅ TypeScript compilation passed"
    fi
    
    # ESLint check (if .eslintrc or eslint config exists)
    if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ]; then
        echo "- Running ESLint checks..."
        if ! npx eslint --quiet . 2>/dev/null; then
            echo "⚠️  ESLint warnings found (proceeding anyway)"
        else
            echo "✅ ESLint checks passed"
        fi
    fi
    
    # Next.js build check (if next.config.js exists)
    if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then
        echo "- Running Next.js build check..."
        if ! npm run build > /dev/null 2>&1; then
            echo "❌ Next.js build failed"
            return 1
        fi
        echo "✅ Next.js build successful"
    fi
    
    return 0
}

# Function to check for validation issues
check_validation() {
    echo "🔍 Running validation checks..."
    
    # Check for common issues
    local validation_errors=0
    
    # Check for exposed secrets (basic patterns)
    if grep -r -i "api_key\|secret\|password\|token" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" src/ 2>/dev/null | grep -v "// @" | grep -v "type" | grep -v "interface"; then
        echo "⚠️  Warning: Potential secrets found in source code"
        validation_errors=$((validation_errors + 1))
    fi
    
    # Check for console.log statements in production code
    if grep -r "console.log" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" src/ 2>/dev/null | wc -l | grep -v "^0$" > /dev/null; then
        echo "⚠️  Warning: console.log statements found (consider removing for production)"
    fi
    
    # Check for TODO/FIXME comments that might indicate incomplete work
    local todo_count=$(grep -r -i "TODO\|FIXME\|HACK" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" src/ 2>/dev/null | wc -l)
    if [ "$todo_count" -gt 0 ]; then
        echo "ℹ️  Found $todo_count TODO/FIXME comments"
    fi
    
    if [ $validation_errors -gt 0 ]; then
        echo "❌ Validation failed with $validation_errors critical issues"
        return 1
    fi
    
    echo "✅ Validation checks passed"
    return 0
}

# Function to generate smart commit message
generate_commit_message() {
    local changed_files=$(git diff --cached --name-only)
    local file_count=$(echo "$changed_files" | wc -l)
    
    # Analyze change patterns
    local message_prefix=""
    local message_detail=""
    
    # Check for specific patterns
    if echo "$changed_files" | grep -q "package.json"; then
        message_prefix="📦"
        message_detail="Dependencies"
    elif echo "$changed_files" | grep -q "claude/"; then
        message_prefix="🤖"
        message_detail="Claude automation"
    elif echo "$changed_files" | grep -q "docs/\|README\|\.md$"; then
        message_prefix="📚"
        message_detail="Documentation"
    elif echo "$changed_files" | grep -q "test\|spec"; then
        message_prefix="🧪"
        message_detail="Tests"
    elif echo "$changed_files" | grep -q "src/components"; then
        message_prefix="🎨"
        message_detail="Components"
    elif echo "$changed_files" | grep -q "src/app\|src/pages"; then
        message_prefix="🏠"
        message_detail="Pages"
    elif echo "$changed_files" | grep -q "\.config\.\|\.env"; then
        message_prefix="🔧"
        message_detail="Configuration"
    else
        message_prefix="✨"
        message_detail="Updates"
    fi
    
    # Generate full message
    local commit_msg="${message_prefix} Auto-commit: ${message_detail}"
    
    if [ "$file_count" -eq 1 ]; then
        commit_msg="${commit_msg} (1 file)"
    else
        commit_msg="${commit_msg} (${file_count} files)"
    fi
    
    echo "$commit_msg"
}

# Function to perform the commit
perform_commit() {
    local commit_message=$(generate_commit_message)
    
    echo "📝 Committing changes..."
    echo "Message: $commit_message"
    
    # Add commit signature
    local full_message="${commit_message}

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
    
    # Commit the changes
    git commit -m "$full_message"
    
    echo "✅ Commit successful: $(git rev-parse --short HEAD)"
    
    # Show what was committed
    echo "📋 Committed files:"
    git show --name-only --pretty=format: HEAD | sed 's/^/  - /'
}

# Main execution
main() {
    echo "🚀 Claude Auto-Commit Hook"
    echo "=========================="
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    # Run all validation checks
    check_git_repo
    check_staged_changes
    
    # Run validation and syntax checks
    if ! check_syntax; then
        echo "❌ Auto-commit aborted: Syntax errors detected"
        exit 1
    fi
    
    if ! check_validation; then
        echo "❌ Auto-commit aborted: Validation errors detected"
        exit 1
    fi
    
    # All checks passed - perform commit
    perform_commit
    
    echo "🎉 Auto-commit completed successfully!"
    echo ""
    echo "💡 Next steps:"
    echo "- Review the commit: git show"
    echo "- Push to remote: git push"
    echo "- Check CI/CD status if configured"
}

# Execute main function with all arguments
main "$@"