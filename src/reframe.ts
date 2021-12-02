export function calculateHeight(el: HTMLElement): number {
  const height = el.getAttribute('height') || el.offsetHeight
  return typeof height === 'string' ? parseInt(height) : height
}

export function calculatePadding(el: HTMLElement): string {
  const width = el.getAttribute('width') || el.offsetWidth
  const height = el.getAttribute('height') || el.offsetHeight
  const numericHeight = typeof height === 'string' ? parseInt(height) : height
  const numbericWidth = typeof width === 'string' ? parseInt(width) : width
  return (numericHeight / numbericWidth) * 100 + '%'
}

export function generateElStyles(el: HTMLElement, styles: Record<string, string | number>): HTMLElement {
  const style = Object.assign(el?.style || {}, styles)
  return Object.assign(el, { style })
}

/**
 * REFRAME.TS 🖼
 * ---
 * @param target
 * @param cName
 * @summary defines the height/width ratio of the targeted <element>
 */

export function reframe(target: string | NodeList, cName = 'js-reframe'): void {
  const frames = typeof target === 'string' ? document.querySelectorAll(target) : 'length' in target ? target : [target]
  for (let i = 0; frames.length > i; i++) {
    const frame = frames[i] as HTMLElement
    const hasClass = frame.className.split(' ').indexOf(cName) !== -1

    if (hasClass || frame.style.width.indexOf('%') > -1) {
      return
    }

    const paddingTop = calculatePadding(frame)
    const div = document.createElement('div')
    div.className = cName
    div.setAttribute('data-testid', 'test-' + cName)
    const divWithStyles = generateElStyles(div, { position: 'relative', width: '100%', paddingTop })
    const frameWithStyles = generateElStyles(frame, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    })

    const frameParent = frameWithStyles.parentNode
    frameParent?.insertBefore(divWithStyles, frameWithStyles)
    frameParent?.removeChild(frameWithStyles)
    divWithStyles.appendChild(frameWithStyles)
  }
}

export default reframe
