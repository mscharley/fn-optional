import option from "./index";

const n = 10 as number | null | undefined;
const test = option(n);
const somethingThatMayNotWork = test.mapIntoOption(v => v.toString());

if (somethingThatMayNotWork.get().get() !== "10") {
  throw Error("Unable to map 10 to a string!");
}

const nullValue = test.mapNullable(_v => null);

if (nullValue.isDefined()) {
  throw Error("Failed to map to a null!");
}

// const invalid = test.map(_v => null);

const young = test.filterNot(v => v > 18);

if (young.isEmpty()) {
  throw Error("Filter was invalid.");
}
