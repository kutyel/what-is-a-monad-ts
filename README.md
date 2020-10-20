# what-is-a-monad-ts

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/kutyel/what-is-a-monad-ts.svg)](https://travis-ci.org/kutyel/what-is-a-monad-ts)
[![Coveralls](https://img.shields.io/coveralls/kutyel/what-is-a-monad-ts.svg)](https://coveralls.io/github/kutyel/what-is-a-monad-ts)

Learn what Monads™️ are in TypeScript!

```typescript
/**
 * The `Monad` type class combines the operations of the `Chain` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:
 *
 * 1. Left identity: `M.chain(M.of(a), f) <--> f(a)`
 * 2. Right identity: `M.chain(fa, M.of) <--> fa`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`
 *
 */
export interface Nothing {
  readonly _tag: 'Nothing'
}

export interface Just<A> {
  readonly _tag: 'Just'
  readonly value: A
}

export type Maybe<A> = Nothing | Just<A>
```
