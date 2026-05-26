# IQSS Hugo Clone

A Hugo-powered website containing archived content from the Harvard Institute for Quantitative Social Science (IQSS) website.

## Overview

This site is built using Hugo and contains:

- **1,075+ People Profiles** - Complete directory of IQSS personnel
- **Organizational Content** - About, programs, services information  
- **News & Events** - Latest updates and announcements
- **Research Resources** - Data science services and technology support
- **Interactive Comments** - Giscus-powered discussions on blog posts

## Development

### Prerequisites

- Hugo Extended v0.140.2+
- Git with submodules support
- Node.js (for theme dependencies)

### Local Development

```bash
# Clone the repository
git clone https://github.com/lenwiz/hugoclone-iqss.git
cd hugoclone-iqss

# Initialize and update git submodules
git submodule update --init --recursive

# Start the Hugo development server
hugo server --buildDrafts
```

Visit `http://localhost:1313` to preview the site.

### Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**Live Site**: https://lenwiz.github.io/hugoclone-iqss

## Features

### Giscus Comments

Blog posts support interactive comments powered by GitHub Discussions through Giscus. To enable:

1. Set up GitHub Discussions in your repository
2. Configure Giscus parameters in `hugo.toml`
3. Add the Giscus app to your repository

### Content Structure

```
content/
├── about/          # About IQSS and organizational info
├── people/         # Personnel directory (1,075+ profiles)
├── programs/       # Research programs and initiatives
├── data-science/   # Data science services
├── technology/     # Computing and tech support
├── news/           # News articles and updates
├── events/         # Events and conferences
└── blog/           # Blog posts with Giscus comments
```

### Theme

Uses the Ananke theme optimized for:
- Academic/research institution websites
- Mobile-responsive design
- Fast loading and SEO optimized
- Social media integration

## Content Source

All content is archived from the official IQSS website (iq.harvard.edu) as of May 2026. This is an educational archive and not an official Harvard/IQSS website.

## License

Content is archived for educational purposes. Original content belongs to Harvard University and IQSS.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss proposed modifications.