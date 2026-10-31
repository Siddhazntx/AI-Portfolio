import type { Contribution } from '../types';

export const ALL_PRS_URL = 'https://github.com/pulls/search?q=is%3Apr+author%3ASiddhazntx+is%3Amerged';

export const contributions: Contribution[] = [
  {
    id: 'jupyterlab-18855',
    repository: 'jupyterlab / jupyterlab',
    prNumber: 'PR #18855',
    description:
      'Implemented and shipped a file-browser loading-animation feature in TypeScript for the JupyterLab core ecosystem. Directly reviewed and merged into the upstream repository by core project maintainers.',
    impact:
      'Provides immediate visual feedback to users during asynchronous file operations and slow directory traversals across remote environments.',
    technologies: ['TypeScript', 'JupyterLab', 'React', 'Frontend Infrastructure'],
    prUrl: 'https://github.com/pulls/search?q=is%3Apr+author%3ASiddhazntx+is%3Amerged',
    status: 'merged',
  },
  {
    id: 'opensre-1755',
    repository: 'tracer / OpenSRE',
    prNumber: 'PR #1755',
    description:
      'Diagnosed, debugged, and resolved failing Windows shell test executions within OpenSRE’s CI/CD automation pipeline. Eliminated cross-platform shell script escape discrepancies.',
    impact:
      'Restored test suite green status and CI gating reliability across Windows runners for an AI-powered Site Reliability Engineering (SRE) agent toolkit.',
    technologies: ['Python', 'CI/CD', 'GitHub Actions', 'PowerShell / Shell', 'DevOps'],
    prUrl: 'https://github.com/pulls/search?q=is%3Apr+author%3ASiddhazntx+is%3Amerged',
    status: 'merged',
  },
  {
    id: 'production-contributions',
    repository: '7+ Merged Production PRs',
    prNumber: '7+ Merged',
    description:
      'Authored and merged 7+ pull requests across production-grade open-source repositories, collaborating directly with maintainers to iterate on feedback, fix bugs, and strengthen software testing.',
    impact:
      'Demonstrated ownership in large-scale codebases across UI components, CI/test infrastructure, and developer tooling.',
    technologies: ['TypeScript', 'Python', 'Open Source', 'Code Review', 'Testing'],
    prUrl: 'https://github.com/pulls/search?q=is%3Apr+author%3ASiddhazntx+is%3Amerged',
    status: 'merged',
  },
];
