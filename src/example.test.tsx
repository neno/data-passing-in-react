import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Example test', () => {
  it('should pass', () => {
    render(<div>Hello Test</div>)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })
})
