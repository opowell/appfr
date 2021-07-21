type MenuType = {
  children: Menu[]
  childrenOpenDown: boolean
  disabled: boolean
  open: boolean
  openDown: boolean
  openOnHover: boolean
  text: String
}

export default class Menu {
  children: Menu[]
  childrenOpenDown: boolean
  disabled: boolean
  open: boolean
  openDown: boolean
  openOnHover: boolean
  parent: Menu | undefined
  text: String
  class: string
  activeMenu: Menu | undefined
  ref: any
  constructor({
    children,
    childrenOpenDown = false,
    disabled,
    text,
    open,
    openDown,
    openOnHover
  }: MenuType, parent: Menu | undefined) {
    this.children = []
    this.childrenOpenDown = childrenOpenDown
    this.disabled = disabled
    this.open = open
    this.openDown = openDown
    this.openOnHover = openOnHover
    this.parent = parent
    this.text = text
    this.class = 'parsed'
    for (const i in children) {
      const child = children[i]
      if (childrenOpenDown) child.openDown = childrenOpenDown
      this.children.push(new Menu(child, this))
    }
  }

  hover() {
    if (this.disabled) return
    if (
      this.openOnHover ||
      this.rootMenu().open
    ) this.setOpen()
  }

  rootMenu(): Menu {
    if (!this.parent) return this
    return this.parent.rootMenu()
  }

  blur() {
    if (this.activeMenu) this.activeMenu.setOpen(false)
    this.clearActiveMenu()
  }

  click() {
    if (this.disabled) return
    this.toggleOpen()
  }

  toggleOpen() {
    this.setOpen(!this.open)
  }

  setOpen(open: boolean = true) {
    this.open = open
    this.clearActiveMenu()
    if (this.parent)
      if (open)
        this.parent.setActiveMenu(this)
      else
        this.parent.clearActiveMenu()
  }

  setActiveMenu(menu: Menu) {
    if (this.activeMenu && this.activeMenu !== menu) this.activeMenu.setOpen(false)
    this.activeMenu = menu
    this.open = true
  }

  clearActiveMenu() {
    if (this.activeMenu) {
      this.activeMenu.clearActiveMenu()
      this.activeMenu.open = false
    }
    this.activeMenu = undefined
  }
}