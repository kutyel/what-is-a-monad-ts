import { applicative, functor, monad } from 'fp-ts-laws'

import { maybe, getEq, getOption } from '../src/what-is-a-monad-ts'

describe('My custom Monad', () => {
  // FIXME: 'getOption' should work
  it('should test Functor laws', () => {
    functor(maybe)(getOption, getEq)
  })

  // FIXME: 'getOption' should work
  it('should test Applicative laws', () => {
    applicative(maybe)(getOption, getEq)
  })

  it('should test Monad laws', () => {
    monad(maybe)(getEq)
  })
})
