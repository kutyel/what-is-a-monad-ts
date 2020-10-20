import { Eq } from 'fp-ts/lib/Eq'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Monad1 } from 'fp-ts/lib/Monad'

import { Arbitrary } from 'fast-check'

// type encoding

const URI = 'Identity'
type URI = typeof URI

interface Identity<A> {
  readonly _tag: 'Identity'
  readonly value: A
}

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Identity<A>
  }
}

// constructor

const iden = <A>(a: A): Identity<A> => ({ _tag: 'Identity', value: a })

// operations

const of: Applicative1<URI>['of'] = iden
const map: Monad1<URI>['map'] = (fa, f) => iden(f(fa.value))
const ap: Monad1<URI>['ap'] = (fab, fa) => iden(fab.value(fa.value))
const chain: Monad1<URI>['chain'] = (ma, f) => f(ma.value)

// needed for tests

export const getEq = <A>(E: Eq<A>): Eq<Identity<A>> => ({
  equals: (x, y) => x === y || E.equals(x.value, y.value)
})

export const getIdentity = <A>(arb: Arbitrary<A>): Arbitrary<Identity<A>> => arb.map(iden)

// main export
export const identity: Monad1<URI> = { URI, map, of, ap, chain }
