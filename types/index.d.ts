/* eslint-disable ts/ban-types */
declare type Recordable<T = any> = Record<string, T>

declare interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T
}

declare type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
}

declare type Prettify<T> = { [P in keyof T]: T[P] } & {}

declare type Key = string | number

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

declare type ObjectValues<T extends object> = T[keyof T]

declare type Writable<T> = {
  -readonly [P in keyof T]: T[P];
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

// 事件
interface ChangeEvent extends Event {
  target: HTMLInputElement
}
interface WheelEvent {
  path?: EventTarget[]
}

type Awaited<T extends Promise<any>> = T extends Promise<infer U> ? (U extends Promise<any> ? MyAwaited<U> : U) : never
