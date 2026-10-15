import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const evidenceStatus = z.enum(["verified", "inferred", "unknown"]);

const evidence = z.object({
  url: z.string().url(),
  version: z.string(),
  commit: z.string().optional(),
  retrieved: z.coerce.date(),
  status: evidenceStatus,
  note: z.string().optional(),
});

const apiItem = z.object({
  name: z.string(),
  kind: z.enum(["prop", "slot", "attribute", "method", "event", "variable"]),
  type: z.string().optional(),
  required: z.boolean().optional(),
  default: z.string().optional(),
  values: z.array(z.string()).optional(),
  description: z.string(),
  status: evidenceStatus,
});

const dimension = z.object({
  name: z.string(),
  values: z.array(z.string()),
  sourceName: z.string(),
  status: evidenceStatus,
});

const components = defineCollection({
  loader: file("src/data/components.json"),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    emoji: z.string(),
    aliases: z.array(z.string()),
    purpose: z.string(),
    anatomy: z.array(z.string()),
    relationships: z.object({
      contains: z.array(z.string()),
      relatedTo: z.array(z.string()),
    }),
    selectionStatus: z.literal("inventory-only"),
  }),
});

const designSystems = defineCollection({
  loader: file("src/data/design-systems.json"),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    university: z.string(),
    library: z.string(),
    technologies: z.array(z.string()),
    version: z.string(),
    documentationUrl: z.string().url(),
    sourceUrl: z.string().url().optional(),
    integrationUrls: z.array(z.string().url()),
    researchGroups: z.array(z.enum(["initial", "SEC", "Kentucky region", "aspirational"])),
    status: evidenceStatus,
    retrieved: z.coerce.date(),
    notes: z.string(),
  }),
});

const componentExamples = defineCollection({
  loader: file("src/data/component-examples.json"),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    canonicalComponent: z.string(),
    designSystem: z.string(),
    sourceName: z.string(),
    implementationType: z.enum(["Twig", "Web Component", "HTML/CSS/JavaScript"]),
    documentationUrl: z.string().url(),
    sourceUrl: z.string().url().optional(),
    summary: z.string(),
    api: z.array(apiItem),
    variantDimensions: z.array(dimension),
    namedPresets: z.array(z.string()),
    states: z.array(dimension),
    responsiveBehavior: z.array(z.object({ description: z.string(), status: evidenceStatus })),
    conditionalRequirements: z.array(z.object({ when: z.string(), requires: z.string(), status: evidenceStatus })),
    compositionConstraints: z.array(z.object({ rule: z.string(), status: evidenceStatus })),
    evidence: z.array(evidence).min(1),
  }),
});

const resources = defineCollection({
  loader: file("src/data/resources.json"),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    type: z.enum(["documentation", "source", "integration", "evidence"]),
    designSystem: z.string().optional(),
    canonicalComponents: z.array(z.string()),
    version: z.string(),
    commit: z.string().optional(),
    retrieved: z.coerce.date(),
    status: evidenceStatus,
    notes: z.string(),
  }),
});

const componentContent = defineCollection({
  schema: z.object({ title: z.string(), path: z.string(), date: z.date() }),
});

const miscContent = defineCollection({
  schema: z.object({ title: z.string(), path: z.string(), date: z.string() }),
});

export const collections = {
  components,
  componentContent,
  componentExamples,
  designSystems,
  miscContent,
  resources,
};
