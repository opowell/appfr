type PanelType = {
  activeChildIndex: number
  children: Panel[]
  display: string
  flex: string
  id: number
  props: Object
  resizable: boolean
  showHeaderClose: boolean
  title: string | undefined
  type: string
  x: number
  y: number
}

export default class Panel {
  activeChildIndex: number
  children: Panel[]
  class: string
  display: string
  flex: string
  id: number
  parent: Panel
  props: any
  resizable: boolean
  showHeaderClose: boolean
  title: string | undefined
  type: string
  x: number
  y: number
  constructor({
    activeChildIndex = 0,
    children,
    display,
    flex,
    id,
    props,
    resizable,
    showHeaderClose,
    title,
    type,
    x = 0,
    y = 0
  }: PanelType, parent: Panel) {
    this.activeChildIndex = activeChildIndex
    this.children = []
    this.class = 'parsed'
    this.display = display
    this.flex = flex
    this.id = id
    this.parent = parent
    this.props = props
    this.resizable = resizable
    this.showHeaderClose = showHeaderClose
    this.title = title
    this.type = type
    this.x = x
    this.y = y
    for (const i in children) {
      const child = children[i]
      const childPanel = new Panel(child, this)
      this.children.push(childPanel)
      childPanel.updateTitle()
    }
    if (!parent) this.updateTitle()
  }

  setActiveChildPanel(child: Panel) {
    const index = this.children.indexOf(child)
    if (index > -1) this.setActiveChild(index)
  }

  setActiveChild(index: number) {
    this.activeChildIndex = index
    this.updateTitle()
    if (this.parent) this.parent.setActiveChildPanel(this)
  }

  updateTitle() {
    if (this.activeChildIndex >= this.children.length) {
      if (this.props)
        this.title = this.props.content
    } else {
      const child = this.children[this.activeChildIndex]
      if (!child) {
        this.title = 'no child ' + this.activeChildIndex
      } else {
        if (child.title) this.title = child.title
        else if (child.props) this.title = child.props.content  
      }
    }
    if (this.parent) this.parent.updateTitle()
  }
}