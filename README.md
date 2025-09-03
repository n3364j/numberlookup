name: Number Lookup

on:
  issue_comment:
    types: [created]

jobs:
  lookup:
    if: startsWith(github.event.comment.body, '.number')
    runs-on: ubuntu-latest
    steps:
      - name: Extract phone number
        id: extract
        run: |
          COMMENT="${{ github.event.comment.body }}"
          PHONE=$(echo "$COMMENT" | cut -d' ' -f2)
          echo "phone=$PHONE" >> $GITHUB_OUTPUT

      - name: Lookup Number
        id: lookup
        run: |
          curl "https://api.apilayer.com/number_verification/validate?number=${{ steps.extract.outputs.phone }}" \
            -H "apikey: ${{ secrets.NUMVERIFY_API_KEY }}" > result.json
          cat result.json

      - name: Reply with Details
        run: |
          DETAILS=$(cat result.json | jq -r '.country_name + " | " + .carrier')
          gh api repos/${{ github.repository }}/issues/comments \
            -f body="📞 Lookup for ${{ steps.extract.outputs.phone }} → $DETAILS"
