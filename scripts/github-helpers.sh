#!/bin/bash

# WanderMood GitHub Helper Scripts
# Collection of useful GitHub CLI commands for the project

function gh_status() {
    echo "📊 WanderMood GitHub Repository Status"
    echo "======================================"
    
    # Repository info
    echo "📁 Repository:"
    gh repo view --json name,description,url,defaultBranchRef | jq -r '
        "Name: \(.name)",
        "Description: \(.description)",
        "URL: \(.url)",
        "Default Branch: \(.defaultBranchRef.name)"
    '
    
    # Recent commits
    echo -e "\n📝 Recent Commits:"
    gh api repos/giquina/wandermood/commits --jq '.[0:5][] | "• \(.commit.message | split("\n")[0]) - \(.commit.author.name) (\(.commit.author.date | split("T")[0]))"'
    
    # Open issues
    echo -e "\n🐛 Open Issues:"
    gh issue list --state open --limit 5 --json title,number | jq -r '.[] | "• #\(.number): \(.title)"'
    
    # Recent releases
    echo -e "\n🚀 Recent Releases:"
    gh release list --limit 3 --json tagName,name,publishedAt | jq -r '.[] | "• \(.tagName): \(.name) (\(.publishedAt | split("T")[0]))"'
}

function gh_create_issue() {
    local title="$1"
    local body="$2"
    
    if [ -z "$title" ]; then
        echo "Usage: gh_create_issue \"Issue Title\" \"Issue Description\""
        return 1
    fi
    
    echo "🐛 Creating GitHub issue: $title"
    gh issue create --title "$title" --body "$body" --label "enhancement"
}

function gh_create_pr() {
    local title="$1"
    local body="$2"
    
    if [ -z "$title" ]; then
        echo "Usage: gh_create_pr \"PR Title\" \"PR Description\""
        return 1
    fi
    
    echo "🔄 Creating pull request: $title"
    gh pr create --title "$title" --body "$body" --reviewer giquina
}

function gh_deploy_status() {
    echo "🚀 Checking deployment status..."
    gh api repos/giquina/wandermood/deployments --jq '.[] | select(.environment == "Production") | "Environment: \(.environment), State: \(.state), Created: \(.created_at | split("T")[0])"' | head -5
}

# Export functions
export -f gh_status gh_create_issue gh_create_pr gh_deploy_status

# If script is run directly, show status
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    gh_status
fi