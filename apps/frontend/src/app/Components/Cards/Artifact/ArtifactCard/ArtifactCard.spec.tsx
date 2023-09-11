import { render } from '@testing-library/react'

import ArtifactCard from './ArtifactCard'

describe('ArtifactCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArtifactCard />)
    expect(baseElement).toBeTruthy()
  })
})
