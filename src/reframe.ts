/**
 * REFRAME.TS 🖼
 * ---
 * @param target
 * @param cName
 * @summary defines the height/width ratio of the targeted <element>
 */
export default function reframe(target: string | HTMLElement | NodeList, cName: string = 'js-reframe') {
  let frames
  const c = cName || 'js-reframe'

  if (typeof target === 'string') {
    frames = [...(document.querySelectorAll(target) as any)]
  } else if ('length' in target) {
    frames = [...(target as any)]
  } else {
    frames = [target]
  }

  frames.forEach((frame) => {
    const hasClass = frame.className.split(' ').indexOf(c) !== -1

    if (hasClass || frame.style.width.indexOf('%') > -1) {
      return
    }

    // get height width attributes
    const height = frame.getAttribute('height') || frame.offsetHeight
    const width = frame.getAttribute('width') || frame.offsetWidth
    const heightNumber = typeof height === 'string' ? parseInt(height) : height
    const widthNumber = typeof width === 'string' ? parseInt(width) : width

    // general targeted <element> sizes
    const padding = (heightNumber / widthNumber) * 100

    // created element <wrapper> of general reframed item
    // => set necessary styles of created element <wrapper>
    const div = document.createElement('div')
    div.className = cName
    const divStyles = div.style
    divStyles.position = 'relative'
    divStyles.width = '100%'
    divStyles.paddingTop = `${padding}%`

    // set necessary styles of targeted <element>
    const frameStyle = frame.style
    frameStyle.position = 'absolute'
    frameStyle.width = '100%'
    frameStyle.height = '100%'
    frameStyle.left = '0'
    frameStyle.top = '0'

    // reframe targeted <element>
    frame.parentNode?.insertBefore(div, frame)
    frame.parentNode?.removeChild(frame)
    div.appendChild(frame)
  })
}
