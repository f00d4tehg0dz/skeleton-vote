# Useful commands
# Link https://www.gulla.net/en/blog/easier-bulk-deletion-of-sanity-documents-using-sanity-cli/
sanity documents query "*[_type == 'cards'][0...200]._id" | groq "*" -o ndjson | xargs sanity documents delete
