#!/bin/bash
echo "🧬 Schema validation fired..."
# call existing schema validator edge function with passthrough JSON
curl -s -X POST "${SUPABASE_URL:-$1}/functions/v1/schema-validator" \
  -H "Authorization: Bearer ${SUPABASE_KEY:-$2}" \
  -H "apikey: ${SUPABASE_KEY:-$2}" \
  -H "Content-Type: application/json" \
  --data "$3"
echo "✅ Schema validator invoked."
