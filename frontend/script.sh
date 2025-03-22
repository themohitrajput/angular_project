#!/bin/bash

# Define the old and new author information
OLD_AUTHOR_NAME="Mohit Devda"
OLD_AUTHOR_EMAIL="mohit.tout@gmail.com"
NEW_AUTHOR_NAME="Varun K"
NEW_AUTHOR_EMAIL="varunkothari007@gmail.com"

# Flag to check if a matching commit is found
match_found=false

# Iterate over each branch
for branch in $(git branch --format='%(refname:short)'); do
 echo "Processing branch: $branch"
  Iterate over each commit using git log and amend the commits
  git log --format="%H" "$branch" | while read -r commit_hash; do
  # Get the author information for the commit
  author_info=$(git log -n 1 --format="%an <%ae>" "$commit_hash")

  # Check if the author information matches the old information
  if [ "$author_info" = "$OLD_AUTHOR_NAME <$OLD_AUTHOR_EMAIL>" ]; then
  # Print out information for debugging

  # Amend the commit with the new author information
  git filter-branch -f --env-filter "GIT_AUTHOR_NAME='$NEW_AUTHOR_NAME'; GIT_AUTHOR_EMAIL='$NEW_AUTHOR_EMAIL'; GIT_COMMITTER_NAME='$NEW_AUTHOR_NAME'; GIT_COMMITTER_EMAIL='$NEW_AUTHOR_EMAIL';" "$commit_hash" "$branch"

  # Print out success message
  echo "Commit $commit_hash amended successfully."

  # Set flag to true to indicate a matching commit is found
  match_found=true
  fi
  done
done

# Check if no matching commit is found
if [ "$match_found" = false ]; then
 echo "No commits found with the specified old author information in any branch."
fi