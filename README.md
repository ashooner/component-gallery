# Higher-Ed Component Inventory

An Astro adaptation of [The Component Gallery](https://github.com/inbn/component-gallery) for evidence-led research into higher-education design systems.

The inventory deliberately separates:

- canonical concepts: shared purpose, aliases, anatomy, and relationships;
- design systems: universities, libraries, technologies, versions, and documentation;
- component examples: actual source implementations and their exact APIs;
- resources: documentation, repositories, integrations, versions/commits, retrieval dates, and evidence status.

Variant dimensions, named presets, states, responsive behavior, conditional requirements, and composition constraints are separate fields. Missing documentation is recorded as `unknown`, never assumed to mean unsupported.

This is descriptive research. A future UK higher-education component specification should be maintained as a separate selection profile.

## Data

Version-controlled records are in [`src/data`](src/data):

- `components.json`
- `design-systems.json`
- `component-examples.json`
- `resources.json`

Astro collection schemas in `src/content/config.ts` validate every record during a build. `scripts/validate-data.mjs` also verifies identifiers and cross-collection references.

## Development

Requires the Node version in `.nvmrc`.

```sh
npm install
npm run validate:data
npm run dev
```

Build the production site and Pagefind search index with:

```sh
npm run build
```

No Airtable credentials or other environment variables are required.

## Initial research scope

- The Ohio State University — Buckeye UX (BUX)
- Yale University — YaleSites Component Library
- University of Illinois Urbana-Champaign — Illinois Web Toolkit
- University of Maryland — UMD Design System

The initial concepts are Card, Hero, Accordion, Navigation, and Image + Text where primary sources expose verified implementations. Planned later research includes Missouri, Texas, Louisville, Stanford, Emory, and Mississippi State, organized into SEC, Kentucky-region, and aspirational groups.

## Attribution and licensing

This repository is adapted from `inbn/component-gallery`. The inspected upstream repository does not contain an explicit license file. Upstream attribution is retained, and this adaptation does not claim to grant a new license for upstream material. Source component libraries and their documentation remain subject to their respective terms.
