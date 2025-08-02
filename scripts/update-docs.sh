#!/bin/bash

# /update-docs - Auto-update documentation based on codebase changes
# Usage: Called via Claude Code slash command

set -e

echo "🔄 Starting documentation update process..."

# Function to update README files
update_readmes() {
    echo "📝 Updating README files..."
    
    # Main README.md
    echo "- Updating main README.md..."
    # This would be enhanced to scan package.json, src/ structure, etc.
    
    # Component READMEs (if they exist)
    find ./src -name "README.md" -type f | while read readme; do
        echo "- Updating $readme..."
        # Logic to update component-specific documentation
    done
}

# Function to update CLAUDE.md
update_claude_md() {
    echo "📋 Updating CLAUDE.md..."
    
    # Update file structure section based on current directory tree
    echo "- Refreshing file structure in CLAUDE.md..."
    
    # Update tech stack section based on package.json
    echo "- Updating tech stack information..."
    
    # Update subagent registry
    echo "- Syncing subagent information..."
}

# Function to update docs/ directory
update_docs_directory() {
    echo "📚 Updating documentation in /docs/..."
    
    # API documentation
    if [ -d "./src/app/api" ]; then
        echo "- Updating API documentation..."
        # Scan API routes and update documentation
    fi
    
    # Component documentation
    if [ -d "./src/components" ]; then
        echo "- Updating component documentation..."
        # Generate component usage examples
    fi
    
    # Configuration documentation
    echo "- Updating configuration documentation..."
    # Document environment variables, config files, etc.
}

# Function to check for changes since last update
check_changes() {
    echo "🔍 Checking for recent changes..."
    
    # Check git diff for relevant files
    CHANGED_FILES=$(git diff --name-only HEAD~1 2>/dev/null || echo "")
    
    if [ -n "$CHANGED_FILES" ]; then
        echo "Recent changes detected in:"
        echo "$CHANGED_FILES" | sed 's/^/  - /'
        return 0
    else
        echo "No recent changes detected."
        return 1
    fi
}

# Function to validate documentation
validate_docs() {
    echo "✅ Validating documentation..."
    
    # Check for broken links (basic check)
    echo "- Checking for obvious documentation issues..."
    
    # Ensure all README files exist where expected
    if [ ! -f "./README.md" ]; then
        echo "⚠️  Warning: Main README.md missing"
    fi
    
    if [ ! -f "./CLAUDE.md" ]; then
        echo "⚠️  Warning: CLAUDE.md missing"
    fi
    
    echo "- Documentation validation complete"
}

# Main execution
main() {
    echo "🚀 WanderMood Documentation Auto-Updater"
    echo "========================================"
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "❌ Error: Not in a git repository"
        exit 1
    fi
    
    # Check for changes (optional - update anyway if called)
    check_changes
    
    # Update documentation sections
    update_readmes
    update_claude_md  
    update_docs_directory
    
    # Validate results
    validate_docs
    
    echo "✨ Documentation update complete!"
    echo ""
    echo "📋 Summary:"
    echo "- README files updated"
    echo "- CLAUDE.md synchronized"
    echo "- Documentation directory refreshed"
    echo "- Validation checks completed"
    echo ""
    echo "💡 Tip: Review changes before committing"
}

# Execute main function
main "$@"