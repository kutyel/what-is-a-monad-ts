import { applicative, functor, monad } from 'fp-ts-laws'

import { maybe, getEq, getMaybe } from '../src/what-is-a-monad-ts'

describe('My custom Monad', () => {
  it('should test Functor laws', () => {
    functor(maybe)(getMaybe, getEq)
  })

  it('should test Applicative laws', () => {
    applicative(maybe)(getMaybe, getEq)
  })

  it('should test Monad laws', () => {
    monad(maybe)(getEq)
  })
})
