import { Eq } from 'fp-ts/lib/Eq'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Monad1 } from 'fp-ts/lib/Monad'
// property-tests
import { Arbitrary, constant /* FIXME: , oneof */ } from 'fast-check'

// TODO: why I cannot call this "Maybe"?? 😭
export const URI = 'Option'
export type URI = typeof URI

export interface Nothing {
  readonly _tag: 'None'
}

export interface Just<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Maybe<A> = Nothing | Just<A>

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

export const isJust = <A>(fa: Maybe<A>): fa is Just<A> => fa._tag === 'Some'
export const isNothing = <A>(fa: Maybe<A>): fa is Nothing => fa._tag === 'None'

// construtors

export const nothing: Maybe<never> = { _tag: 'None' }
export const just = <A>(a: A): Maybe<A> => ({ _tag: 'Some', value: a })

// operations

export const of: Applicative1<URI>['of'] = just

export const map: Monad1<URI>['map'] = (fa, f) => (isNothing(fa) ? nothing : just(f(fa.value)))

export const ap: Monad1<URI>['ap'] = (fab, fa) =>
  isNothing(fab) ? nothing : isNothing(fa) ? nothing : just(fab.value(fa.value))

export const chain: Monad1<URI>['chain'] = (ma, f) => (isNothing(ma) ? nothing : f(ma.value))

// needed for tests

export const getEq = <A>(E: Eq<A>): Eq<Maybe<A>> => ({
  equals: (x, y) =>
    x === y || (isNothing(x) ? isNothing(y) : isNothing(y) ? false : E.equals(x.value, y.value))
})

// instances of Arbitrary for fast-check

export const getSome = <A>(arb: Arbitrary<A>): Arbitrary<Maybe<A>> => arb.map(just)

export const getNone = <A>(): Arbitrary<Maybe<A>> => constant(nothing)

// FIXME: why this does not work?
// export const getOption = <A>(arb: Arbitrary<A>): Arbitrary<Maybe<A>> =>
//   oneof(getNone(), getSome(arb))

// minimal Monad implementation

export const maybe: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
