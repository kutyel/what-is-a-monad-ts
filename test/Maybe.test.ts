import { applicative, functor, monad } from 'fp-ts-laws'

import { maybe, getEqMaybe, getMaybe } from '../src/'

describe('Maybe', () => {
  it('should test Functor laws', () => {
    functor(maybe)(getMaybe, getEqMaybe)
  })

  it('should test Applicative laws', () => {
    applicative(maybe)(getMaybe, getEqMaybe)
  })

  it('should test Monad laws', () => {
    monad(maybe)(getEqMaybe)
  })
})
