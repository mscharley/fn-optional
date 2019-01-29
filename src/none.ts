import { Option } from "./option";

export class ElementNotFoundError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

export class None implements Option<never> {
  public get = (): never => {
    throw new ElementNotFoundError();
  }
  public getOrElse = <U>(v: U): U => {
    return v;
  }
  public orNull = (): null => {
    return null;
  }
  public orUndefined(): undefined {
    return undefined;
  }
  public orThrow(e: Error): never {
    throw e;
  }

  public exists(_f: (v: never) => boolean): boolean {
    return false;
  }
  public filter(_f: (v: never) => boolean): None {
    return this;
  }
  public filterNot(_f: (v: never) => boolean): None {
    return this;
  }
  public flatMap<U>(_f: (v: never) => Option<U>): None {
    return this;
  }
  public forAll(_f: (v: never) => boolean): boolean {
    return false;
  }
  public forEach(_f: (v: never) => void): void {
    return;
  }
  public map<U>(_f: (v: never) => NonNullable<U>): None {
    return this;
  }
  public mapIntoOption<U>(_f: (v: never) => U): None {
    return this;
  }
  public mapNullable<U>(_f: (v: never) => U): None {
    return this;
  }

  public isDefined(): boolean {
    return false;
  }
  public isEmpty(): boolean {
    return true;
  }

  public toArray(): [] {
    return [];
  }
  public toString(): string {
    return "None";
  }
}
