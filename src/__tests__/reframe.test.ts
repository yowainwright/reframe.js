import { getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom'
import reframe from '../reframe'

function setupReframeDom(): HTMLDivElement {
  const parent = document.createElement('div')
  return document.body.appendChild(parent)
}

describe('reframe', () => {
  it('has rendered a reframe', () => {
    const dom: HTMLDivElement = setupReframeDom()
    const iframe =
      '<iframe id="iframe" data-testid="iframe" width="315" height="315" src="https://www.youtube.com/embed/6FQsIfE7sZM" frameborder="0" allowfullscreen></iframe>'
    dom.insertAdjacentHTML('afterbegin', iframe)
    reframe('#iframe')
    const test = getByTestId(dom, 'test-js-reframe')
    expect(test).toBeTruthy()
    expect(test).toHaveClass('js-reframe')
  })
})
