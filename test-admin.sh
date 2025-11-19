#!/bin/bash

echo "Testing admin login..."
LOGIN_RESPONSE=$(curl -s -c cookies.txt http://localhost:3000/api/admin/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"password":"ilovenavs17"}')

echo "Login response: $LOGIN_RESPONSE"

echo ""
echo "Testing analytics endpoint..."
ANALYTICS_RESPONSE=$(curl -s -b cookies.txt http://localhost:3000/api/admin/analytics?timeFilter=7d)

echo "Analytics response: $ANALYTICS_RESPONSE" | head -c 200
echo "..."

rm -f cookies.txt
