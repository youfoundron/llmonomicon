// Single source of truth for site-level configuration. Everything that depends
// on the GitHub repo identity, deploy location, or branding reads from here.

export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  /** GitHub owner or organization that hosts the repo. */
  owner: string;
  repo: string;
  /** Default branch used for "Edit on GitHub" links. */
  branch: string;
  /**
   * Origin (scheme + host, no trailing slash) used to build absolute URLs in
   * prefilled issues. For a project page this is the github.io host.
   */
  siteOrigin: string;
  /**
   * Path prefix for the deployment. "" for a user/org page or custom domain;
   * "/llmonomicon" for a project page served at user.github.io/llmonomicon/.
   * No trailing slash. All emitted URLs are joined against this.
   */
  basePath: string;
  /** Issue Form filenames under .github/ISSUE_TEMPLATE/. */
  editIssueTemplate: string;
  newArticleTemplate: string;
  /** Local dev server port. */
  devPort: number;
}

export const config: SiteConfig = {
  siteName: "llmonomicon",
  tagline: "A digital grimoire of large language models",
  description:
    "A markdown-first, community-edited wiki on the history, concepts, tools, people, and projects of large language models.",
  owner: "youfoundron",
  repo: "llmonomicon",
  branch: "main",
  siteOrigin: "https://youfoundron.github.io",
  basePath: "/llmonomicon",
  editIssueTemplate: "edit-suggestion.yml",
  newArticleTemplate: "new-article.yml",
  devPort: 4173,
};
