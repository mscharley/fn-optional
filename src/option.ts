export interface Option<T> {
  get(): T;
  getOrElse<U>(v: U): T | U;
  orNull(): T | null;
  orUndefined(): T | undefined;
  orThrow(e: Error): T;

  exists(f: (v: T) => boolean): boolean;
  filter(f: (v: T) => boolean): Option<T>;
  filterNot(f: (v: T) => boolean): Option<T>;
  flatMap<U>(f: (v: T) => Option<U>): Option<U>;
  // fold?
  forAll(f: (v: T) => boolean): boolean;
  forEach(f: (v: T) => void): void;
  map<U>(f: (v: T) => NonNullable<U>): Option<NonNullable<U>>;
  mapIntoOption<U>(f: (v: T) => U): Option<Option<NonNullable<U>>>;
  mapNullable<U>(f: (v: T) => U): Option<NonNullable<U>>;

  isDefined(): boolean;
  isEmpty(): boolean;

  toArray(): [] | [T];
  toString(): string;
};
