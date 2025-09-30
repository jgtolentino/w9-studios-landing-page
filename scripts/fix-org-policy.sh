#!/bin/bash

# Script to fix Google Cloud Organization Policy blocking service account key creation
# For W9 Studios - business@w9studio.net

echo "=========================================="
echo "Google Cloud Organization Policy Fix"
echo "=========================================="
echo ""
echo "This script will help you disable the organization policy that's"
echo "blocking service account key creation."
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed."
    echo ""
    echo "To install gcloud CLI on macOS:"
    echo "1. Run: brew install google-cloud-sdk"
    echo "   OR"
    echo "2. Download from: https://cloud.google.com/sdk/docs/install"
    echo ""
    echo "After installation, run this script again."
    exit 1
fi

echo "✅ gcloud CLI found"
echo ""

# Check authentication
echo "Checking authentication status..."
ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null)

if [ -z "$ACCOUNT" ]; then
    echo "❌ Not authenticated with gcloud"
    echo ""
    echo "Please authenticate:"
    gcloud auth login
    echo ""
    ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")
fi

echo "✅ Authenticated as: $ACCOUNT"
echo ""

# Get organization ID
echo "Finding your organization..."
ORG_ID=$(gcloud organizations list --format="value(ID)" 2>/dev/null | head -1)

if [ -z "$ORG_ID" ]; then
    echo "❌ No organization found for account: $ACCOUNT"
    echo ""
    echo "This might mean:"
    echo "1. You're using a personal Google account (not Google Workspace)"
    echo "2. Your account doesn't have organization access"
    echo ""
    echo "SOLUTION: You don't need to fix organization policies!"
    echo "Just use OAuth 2.0 instead of service account keys."
    echo ""
    exit 0
fi

echo "✅ Found organization: $ORG_ID"
echo ""

# Check current policy
echo "Checking current policy status..."
POLICY_STATUS=$(gcloud resource-manager org-policies describe \
    iam.disableServiceAccountKeyCreation \
    --organization=$ORG_ID \
    2>/dev/null)

if [ -z "$POLICY_STATUS" ]; then
    echo "⚠️  Policy not found or you don't have permission to view it"
    echo ""
fi

# Check if user has permission to change policy
echo "Checking your permissions..."
HAS_PERMISSION=$(gcloud organizations get-iam-policy $ORG_ID \
    --flatten="bindings[].members" \
    --filter="bindings.members:$ACCOUNT AND bindings.role:roles/orgpolicy.policyAdmin" \
    --format="value(bindings.role)" \
    2>/dev/null)

if [ -z "$HAS_PERMISSION" ]; then
    echo "❌ You don't have Organization Policy Administrator permission"
    echo ""
    echo "To fix this, someone with admin access needs to run:"
    echo ""
    echo "gcloud organizations add-iam-policy-binding $ORG_ID \\"
    echo "    --member=\"user:$ACCOUNT\" \\"
    echo "    --role=\"roles/orgpolicy.policyAdmin\""
    echo ""
    echo "OR ask your Google Workspace admin to disable this policy."
    echo ""
    echo "Tracking number for Google Support: c7271791236903207"
    exit 1
fi

echo "✅ You have permission to change policies"
echo ""

# Disable the policy
echo "Would you like to disable the policy blocking service account keys? (y/n)"
read -r CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Disabling policy iam.disableServiceAccountKeyCreation..."

# Create policy file
cat > /tmp/disable-policy.yaml << EOF
constraint: iam.disableServiceAccountKeyCreation
booleanPolicy:
  enforced: false
EOF

# Apply the policy
gcloud resource-manager org-policies set-policy /tmp/disable-policy.yaml \
    --organization=$ORG_ID

if [ $? -eq 0 ]; then
    echo "✅ Policy successfully disabled!"
    echo ""
    echo "You can now create service account keys in your projects."
else
    echo "❌ Failed to disable policy"
    echo ""
    echo "Please try manually in Google Cloud Console:"
    echo "1. Go to: https://console.cloud.google.com/iam-admin/orgpolicies"
    echo "2. Search for: iam.disableServiceAccountKeyCreation"
    echo "3. Click on it and select 'Override parent's policy'"
    echo "4. Turn OFF enforcement"
fi

# Cleanup
rm -f /tmp/disable-policy.yaml

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo "1. Go back to Google Cloud Console"
echo "2. Try creating your OAuth 2.0 credentials again"
echo "3. Follow /docs/GOOGLE_CLOUD_SETUP_INSTRUCTIONS.md"
echo ""