/* noframe.js () 🖼
  -------------
  takes 2 arguments:
  => target: targeted <element>
  => container: optional targeted <parent> of targeted <element>
  -------------
  defines the height/width ratio of the targeted <element>
  based on the targeted <parent> width
*/
export function noframe(target: string | HTMLElement, container: string): void {
  const frames = typeof target === 'string' ? document.querySelectorAll(target) : 'length' in target ? target : [target]
  for (let i = 0; frames.length > i; i++) {
    const frame = frames[i] as HTMLElement
    frame.setAttribute('data-testid', 'test-js-noframe')
    const isContainerElement = typeof container !== 'undefined' && document.querySelector(container)
    const parent: HTMLElement = isContainerElement ? document.querySelector(container) : frame.parentElement
    const h = frame.offsetHeight
    const w = frame.offsetWidth
    const styles = frame.style
    // => If a targeted <container> element is defined
    if (isContainerElement) {
      // gets/sets the height/width ratio
      const maxW = window.getComputedStyle(parent, null).getPropertyValue('max-width')
      styles.width = '100%'
      // calc is needed here b/c the maxW measurement type is unknown
      styles.maxHeight = `calc(${maxW} * ${h} / ${w})`
    } else {
      // gets/sets the height/width ratio
      // => if a targeted <element> closest parent <element> is NOT defined
      styles.display = 'block'
      styles.marginLeft = 'auto'
      styles.marginRight = 'auto'
      const fullW = w > parent.offsetWidth ? parent.offsetWidth : w
      const maxH = w > parent.offsetWidth ? (fullW * h) / w : w * (h / w)
      // if targeted <element> width is > than it's parent <element>
      // => set the targeted <element> maxheight/fullwidth to it's parent <element>
      styles.maxHeight = `${maxH}px`
      styles.width = `${fullW}px`
    }
    // set a calculated height of the targeted <element>
    const cssHeight = (100 * h) / w // eslint-disable-line no-mixed-operators
    styles.height = `${cssHeight}vw`
    styles.maxWidth = '100%'
  }
}

export default noframe
