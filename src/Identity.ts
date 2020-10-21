import { Eq } from 'fp-ts/lib/Eq'
import { Functor1 } from 'fp-ts/lib/Functor'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Monad1 } from 'fp-ts/lib/Monad'

import { Arbitrary } from 'fast-check'

// type encoding
type Identity<A> = A

const URI = 'Identity'
type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Identity: Identity<A>
  }
}

// constructor
const id = <A>(x: A): A => x

// operations
const map: Functor1<URI>['map'] = (fa, f) => f(fa)
const of: Applicative1<URI>['of'] = id
const ap: Applicative1<URI>['ap'] = (fab, fa) => fab(fa)
const chain: Monad1<URI>['chain'] = (ma, f) => f(ma)

// needed for tests
export const getEq = <A>(): Eq<Identity<A>> => ({ equals: (x, y) => x === y })
export const getIdentity = <A>(arb: Arbitrary<A>): Arbitrary<Identity<A>> => arb.map(id)

// main export
export const identity: Monad1<URI> = { URI, map, of, ap, chain }
