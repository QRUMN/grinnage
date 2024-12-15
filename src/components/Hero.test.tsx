import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders without crashing', () => {
    render(<Hero />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
