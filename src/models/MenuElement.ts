type MenuType = {
  children: Menu[]
  disabled: boolean
  open: boolean
  openOnHover: boolean
  text: String
}

class Menu {
  children: Menu[]
  disabled: boolean
  open: boolean
  openOnHover: boolean
  parent: Menu
  text: String
  constructor({
    disabled,
    text,
    children,
    open,
    openOnHover
  }: MenuType, parent: Menu) {
    this.children = []
    this.disabled = disabled
    this.open = open
    this.openOnHover = openOnHover
    this.parent = parent
    this.text = text
    for (const i in children) {
      const child = children[i]
      this.children.push(new Menu(child, this))
    }
  }

  hover(ev) {
    if (this.disabled) return
    if (this.openOnHover) this.setOpen()
  }

  click(ev) {
    if (this.disabled) return
    this.toggleOpen()
  }

  toggleOpen() {
    this.setOpen(!this.open)
  }

  setOpen(open: boolean = true) {
    this.open = open
  }
}