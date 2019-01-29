export interface Option<T> {
  get(): T;
  getOrElse(v: T): T;
  orNull(): T | null;
  orUndefined(): T | null;
  orThrow(e: Error): T;

  exists(f: (v: T) => boolean): boolean;
  filter(f: (v: T) => boolean): Option<T>;
  filterNot(f: (v: T) => boolean): Option<T>;
  flatMap<U>(f: (v: T) => Option<U>): Option<U>;
  // fold?
  forAll(f: (v: T) => boolean): boolean;
  forEach(f: (v: T) => void): void;
  map<U>(f: (v: T) => NonNullable<U>): Option<NonNullable<U>>;
  mapOptional<U>(f: (v: T) => U): Option<Option<NonNullable<U>>>;
  mapNullable<U>(f: (v: T) => U): Option<NonNullable<U>>;

  isDefined(): boolean;
  isEmpty(): boolean;

  toArray(): [] | [T];
  toString(): string;
};
