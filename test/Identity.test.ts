import { applicative, functor, monad } from 'fp-ts-laws'

import { identity, getEq, getIdentity } from '../src/Identity'

describe('Identity', () => {
  it('should test Functor laws', () => {
    functor(identity)(getIdentity, getEq)
  })

  it('should test Applicative laws', () => {
    applicative(identity)(getIdentity, getEq)
  })

  it('should test Monad laws', () => {
    monad(identity)(getEq)
  })
})
