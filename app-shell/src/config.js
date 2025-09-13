

const config = {
  admin_pass: "8f15ea4e",
  admin_email: "admin@flatlogic.com",
  schema_encryption_key: process.env.SCHEMA_ENCRYPTION_KEY || '',

  project_uuid: '8f15ea4e-53ae-44cd-8d4c-3b3455211e64',
  flHost: process.env.NODE_ENV === 'production' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',

  gitea_domain: process.env.GITEA_DOMAIN || 'gitea.flatlogic.app',
  gitea_username: process.env.GITEA_USERNAME || 'admin',
  gitea_api_token: process.env.GITEA_API_TOKEN || null,
  github_repo_url: process.env.GITHUB_REPO_URL || null,
  github_token: process.env.GITHUB_TOKEN || null,
};

module.exports = config;
