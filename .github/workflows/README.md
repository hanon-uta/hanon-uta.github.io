# GitHub Actions Workflow

This directory contains GitHub Actions workflows for automated building and deployment.

## Workflows

### deploy.yml
Main workflow that builds and deploys the site to GitHub Pages when data files are updated.

**Triggers:**
- Push to `main` branch with changes in:
  - `src/assets/data/**` (data files)
  - `src/**` (source code)
  - Configuration files (package.json, vite.config.ts, tsconfig*.json)
- Manual trigger via GitHub Actions UI

**Jobs:**
1. **build**: Installs dependencies, validates JSON files, builds the project
2. **deploy**: Deploys the built artifacts to GitHub Pages

### validate-json.yml
Validates JSON data files before they are merged.

**Triggers:**
- Pull requests with changes in `src/assets/data/**`
- Pushes to `main` branch with changes in `src/assets/data/**`

**Validations:**
- Required fields: video_title, video_artist, video_id, video_publish_date_str, song_timeline
- YouTube ID format (11 alphanumeric characters)
- Date format (YYYY-MM-DD)

## Usage

### Adding new data
1. Add JSON file to `src/assets/data/{vtuber}/`
2. Commit and push to main branch
3. GitHub Actions will automatically build and deploy

### Manual deployment
1. Go to Actions tab in GitHub
2. Select "Build and Deploy to GitHub Pages" workflow
3. Click "Run workflow" button

## Troubleshooting

If deployment fails:
1. Check Actions tab for error logs
2. Verify JSON file format matches the schema
3. Ensure all required fields are present
4. Check YouTube ID and date format
