import { readFile } from "node:fs/promises";

const load = async (name) =>
  JSON.parse(await readFile(new URL(`../src/data/${name}.json`, import.meta.url), "utf8"));

const [components, designSystems, examples, resources] = await Promise.all([
  load("components"),
  load("design-systems"),
  load("component-examples"),
  load("resources"),
]);

const errors = [];
const ids = (items) => new Set(items.map(({ id }) => id));
const duplicateIds = (items, collection) => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) errors.push(`${collection}: duplicate id ${item.id}`);
    seen.add(item.id);
  }
};

duplicateIds(components, "components");
duplicateIds(designSystems, "designSystems");
duplicateIds(examples, "componentExamples");
duplicateIds(resources, "resources");

const componentIds = ids(components);
const systemIds = ids(designSystems);

for (const example of examples) {
  if (!componentIds.has(example.canonicalComponent)) {
    errors.push(`${example.id}: unknown canonicalComponent ${example.canonicalComponent}`);
  }
  if (!systemIds.has(example.designSystem)) {
    errors.push(`${example.id}: unknown designSystem ${example.designSystem}`);
  }
  if (!example.evidence?.length) errors.push(`${example.id}: evidence is required`);
  for (const item of example.api ?? []) {
    if (!item.name || !item.kind || !item.status) {
      errors.push(`${example.id}: incomplete API record ${JSON.stringify(item)}`);
    }
  }
}

for (const resource of resources) {
  if (resource.designSystem && !systemIds.has(resource.designSystem)) {
    errors.push(`${resource.id}: unknown designSystem ${resource.designSystem}`);
  }
  for (const component of resource.canonicalComponents ?? []) {
    if (!componentIds.has(component)) {
      errors.push(`${resource.id}: unknown canonical component ${component}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${components.length} concepts, ${designSystems.length} systems, ${examples.length} implementations, and ${resources.length} resources.`,
  );
}
