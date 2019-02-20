import { result } from "./result";

const request = (_url: string) => result({ body: "Hello world" });

const output =
  result(null)
  // Value(null)
    .flatMap(() => request("https://google.com/"))
    // Value({ body: "Hello world" })
    .map(({ body }) => { throw new Error(body); })
    // Error(Hello world)
    .map(() => process.exit(1)) // this will never run.
    .catch((e) => e.toString())
    // Value("Error: Hello world")
    .forEach((v) => console.debug(v))
    .map((v) => v.length);
    // Value(18)

console.log(output.toString());
