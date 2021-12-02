import { getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom'
import noframe from '../noframe'

function setupReframeDom(): HTMLDivElement {
  const parent = document.createElement('div')
  parent.id = 'test-js-noframe-parent'
  return document.body.appendChild(parent)
}

describe('noframe', () => {
  it('has rendered a noframe', () => {
    const dom: HTMLDivElement = setupReframeDom()
    const iframe =
      '<iframe id="iframe" data-testid="iframe" width="315" height="315" src="https://www.youtube.com/embed/6FQsIfE7sZM" frameborder="0" allowfullscreen></iframe>'
    dom.insertAdjacentHTML('afterbegin', iframe)
    noframe('#iframe', '#test-js-noframe-parent')
    const test = getByTestId(dom, 'test-js-noframe')
    expect(test).toBeTruthy()
  })
})
