import { Option } from "./option";
import { None } from "./none";
import option from ".";

export class Some<T> implements Option<NonNullable<T>> {
  constructor(
    private _value: NonNullable<T>,
  ) { }

  public get(): NonNullable<T> {
    return this._value;
  }
  public getOrElse<U>(_v: U): NonNullable<T> {
    return this._value;
  }
  public orNull(): NonNullable<T> {
    return this._value;
  }
  public orUndefined(): NonNullable<T> {
    return this._value;
  }
  public orThrow(_e: Error): NonNullable<T> {
    return this._value;
  }

  public exists(f: (v: NonNullable<T>) => boolean): boolean {
    return f(this._value);
  }
  public filter(f: (v: NonNullable<T>) => boolean): Option<NonNullable<T>> {
    return f(this._value) ? this : new None();
  }
  public filterNot(f: (v: NonNullable<T>) => boolean): Option<NonNullable<T>> {
    return f(this._value) ? new None() : this;
  }
  public flatMap<U>(f: (v: NonNullable<T>) => Option<U>): Option<U> {
    return f(this._value);
  }
  public forAll(f: (v: NonNullable<T>) => boolean): boolean {
    return f(this._value);
  }
  public forEach(f: (v: NonNullable<T>) => void): void {
    f(this._value);
  }
  public map<U>(f: (v: NonNullable<T>) => NonNullable<U>): Some<U> {
    return new Some(f(this._value));
  }
  public mapIntoOption<U>(f: (v: NonNullable<T>) => U): Option<Option<NonNullable<U>>> {
    return new Some(option(f(this._value)));
  }
  public mapNullable<U>(f: (v: NonNullable<T>) => U): Option<NonNullable<U>> {
    return option(f(this._value));
  }

  public isDefined(): boolean {
    return true;
  }
  public isEmpty(): boolean {
    return false;
  }

  public toArray(): [NonNullable<T>] {
    return [this._value];
  }
  public toString(): string {
    return `Some(${this._value})`;
  }
}
