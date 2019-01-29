import { Option } from "./option";

export class Some<T> implements Option<NonNullable<T>> {
  constructor(
    public value: NonNullable<T>,
  ) { }
}
