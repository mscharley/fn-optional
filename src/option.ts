export class ElementNotFoundError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

export interface Option<T> {
  get: (() => T);
  getOrElse: (<U>(v: U) => T | U);
  orNull: (() => T | null);
  orUndefined: (() => T | undefined);
  orThrow: ((e: Error) => T);

  exists: ((f: (v: T) => boolean) => boolean);
  filter: ((f: (v: T) => boolean) => Option<T>);
  filterNot: ((f: (v: T) => boolean) => Option<T>);
  flatMap: (<U>(f: (v: T) => Option<U>) => Option<U>);
  // fold?
  forAll: ((f: (v: T) => boolean) => boolean);
  forEach: ((f: (v: T) => void) => this);
  map: (<U>(f: (v: T) => NonNullable<U>) => Option<NonNullable<U>>);
  mapIntoOption: (<U>(f: (v: T) => U) => Option<Option<NonNullable<U>>>);
  mapFilter: (<U>(f: (v: T) => U) => Option<NonNullable<U>>);

  isDefined: (() => boolean);
  isEmpty: (() => boolean);

  toArray: (() => [] | [T]);
  toString: (() => string);
};

class Some<T> implements Option<NonNullable<T>> {
  constructor(
    private _value: NonNullable<T>,
  ) { }

  public get = (): NonNullable<T> => this._value;
  public getOrElse = <U>(_v: U): NonNullable<T> => this._value;
  public orNull = (): NonNullable<T> => this._value;
  public orUndefined = (): NonNullable<T> => this._value;
  public orThrow = (_e: Error): NonNullable<T> => this._value;

  public exists = (f: (v: NonNullable<T>) => boolean): boolean => f(this._value);
  public filter = (f: (v: NonNullable<T>) => boolean): Option<NonNullable<T>> => f(this._value) ? this : new None();
  public filterNot = (f: (v: NonNullable<T>) => boolean): Option<NonNullable<T>> => f(this._value) ? new None() : this;
  public flatMap = <U>(f: (v: NonNullable<T>) => Option<U>): Option<U> => f(this._value);
  public forAll = (f: (v: NonNullable<T>) => boolean): boolean => f(this._value);
  public forEach = (f: (v: NonNullable<T>) => void): this => { f(this._value); return this; };
  public map = <U>(f: (v: NonNullable<T>) => NonNullable<U>): Some<U> => new Some(f(this._value));
  public mapIntoOption = <U>(f: (v: NonNullable<T>) => U): Option<Option<NonNullable<U>>> => new Some(option(f(this._value)));
  public mapFilter = <U>(f: (v: NonNullable<T>) => U): Option<NonNullable<U>> => option(f(this._value));

  public isDefined = (): boolean => true;
  public isEmpty = (): boolean => false;

  public toArray = (): [NonNullable<T>] => [this._value];
  public toString = (): string => `Some(${this._value})`;
}

class None implements Option<never> {
  public get = (): never => { throw new ElementNotFoundError(); }
  public getOrElse = <U>(v: U): U => v;
  public orNull = (): null => null;
  public orUndefined = (): undefined => undefined;
  public orThrow = (e: Error): never => { throw e };

  public exists = (_f: (v: never) => boolean): boolean => false;
  public filter = (_f: (v: never) => boolean): None => this;
  public filterNot = (_f: (v: never) => boolean): None => this;
  public flatMap = <U>(_f: (v: never) => Option<U>): None => this;
  public forAll = (_f: (v: never) => boolean): boolean => false;
  public forEach = (_f: (v: never) => void): this => this;
  public map = <U>(_f: (v: never) => NonNullable<U>): None => this;
  public mapIntoOption = <U>(_f: (v: never) => U): None => this;
  public mapFilter = <U>(_f: (v: never) => U): None => this;

  public isDefined = (): boolean => false;
  public isEmpty = (): boolean => true;

  public toArray = (): [] => [];
  public toString = (): string => "None";
}

export function option<T>(v: T): Option<NonNullable<T>> {
  if (v == null) {
    return new None();
  }
  else {
    return new Some(v as NonNullable<T>);
  }
};
