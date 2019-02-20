import { Option, option } from "./option";

export interface Result<T, E extends Error = Error> {
  get: (() => Option<T>);
  getOrThrow: (() => T);
  error: (() => Option<E>);

  map: (<U, F extends Error>(fn: (v: T) => U) => Result<U, E | F>);
  exists: ((fn: (v: T) => boolean) => boolean);
  catch: (<U>(fn: (e: E) => U) => Result<T | U, never>);
  flatMap: (<U, F extends Error>(fn: (v: T) => Result<U, F>) => Result<U, E | F>);
  forAll: ((fn: (v: T) => boolean) => boolean);
  forEach: ((fn: (v: T) => void) => this);

  isDefined: (() => boolean);
  isError: (() => boolean);

  toString: (() => string);
}

class Value<T, E extends Error> implements Result<T, E> {
  public constructor(private _value: T) {}

  public get = () => option(this._value);
  public getOrThrow = () => this._value;
  public error = () => option(null);

  public map = <U, F extends Error>(fn: (v: T) => U): Result<U, E | F> => {
    try {
      return new Value<U, E>(fn(this._value));
    }
    catch (e) {
      if (e instanceof Error) {
        return new ErrorResult<U, F>(e as F);
      }
      else {
        return new ErrorResult<U, F>(Error(`${e}`) as F);
      }
    }
  };
  public exists = (fn: (v: T) => boolean) => fn(this._value);
  public catch = <U>(_fn: (e: E) => T | U) => this as unknown as Result<U, never>;
  public flatMap = <U, F extends Error>(fn: (v: T) => Result<U, F>): Result<U, F> => {
    try {
      return fn(this._value);
    }
    catch (e) {
      if (e instanceof Error) {
        return new ErrorResult<U, F>(e as F);
      }
      else {
        return new ErrorResult<U, F>(Error(`${e}`) as F);
      }
    }
  };
  public forAll = (fn: (v: T) => boolean) => fn(this._value);
  public forEach = (fn: (v: T) => void) => { fn(this._value); return this; }

  public isDefined = () => true;
  public isError = () => false;

  public toString = () => `Value(${this._value})`;
}

class ErrorResult<T, E extends Error> implements Result<T, E> {
  public constructor(private _error: E) {}

  public get = () => option(null);
  public getOrThrow = () => { throw this._error; };
  public error = () => option(this._error);

  public map = <U>(_fn: (v: T) => U): Result<U, E> => this as unknown as Result<U, E>;
  public exists = (_fn: (v: T) => boolean) => false;
  public catch = <U>(fn: (e: E) => U) => {
    try {
      return new Value<U, never>(fn(this._error));
    }
    catch(e) {
      if (e instanceof Error) {
        return new ErrorResult<U, never>(e as never);
      }
      else {
        return new ErrorResult<U, never>(e as never);
      }
    }
  };
  public flatMap = <U, F extends Error>(_fn: (v: T) => Result<U, F>): Result<U, E> => this as unknown as Result<U, E>;
  public forAll = (_fn: (v: T) => boolean) => false;
  public forEach = (_fn: (v: T) => void) => this;

  public isDefined = () => false;
  public isError = () => true;

  public toString = () => `Error(${this._error.message})`;
}

export const result = <T>(v: T): Result<T, never> => {
  return new Value(v);
}
