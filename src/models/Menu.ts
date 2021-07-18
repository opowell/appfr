type MenuType = {
  children: Menu[]
  disabled: boolean
  open: boolean
  openOnHover: boolean
  text: String
}

export default class Menu {
  children: Menu[]
  disabled: boolean
  open: boolean
  openOnHover: boolean
  parent: Menu | undefined
  text: String
  class: string
  activeMenu: Menu | undefined
  ref: any
  constructor({
    disabled,
    text,
    children,
    open,
    openOnHover
  }: MenuType, parent: Menu | undefined) {
    this.children = []
    this.disabled = disabled
    this.open = open
    this.openOnHover = openOnHover
    this.parent = parent
    this.text = text
    this.class = 'parsed'
    for (const i in children) {
      const child = children[i]
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
    if (this.openOnHover) this.setOpen(false)
  }

  click() {
    if (this.disabled) return
    this.toggleOpen()
  }

  toggleOpen() {
    this.setOpen(!this.open)
  }

  setOpen(open: boolean = true) {
    console.log('set open', open, this)
    this.open = open
    if (this.parent)
      if (open)
        this.parent.setActiveMenu(this)
      else
        this.parent.clearActiveMenu()
  }

  setActiveMenu(menu: Menu) {
    if (this.activeMenu) this.activeMenu.setOpen(false)
    this.activeMenu = menu
    this.open = true
  }

  clearActiveMenu() {
    this.activeMenu = undefined
  }
}