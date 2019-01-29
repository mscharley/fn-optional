import { Option } from "./option";
import { ElementNotFoundError, None } from "./none";
import { Some } from "./some";

export default function option<T>(v: T): Option<NonNullable<T>> {
  if (v == null) {
    return new None();
  }
  else {
    return new Some(v as NonNullable<T>);
  }
};

export { ElementNotFoundError as ElementNotFound, Option };
