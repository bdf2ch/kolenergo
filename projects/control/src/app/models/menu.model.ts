import { MenuItem } from './menu-item.model';

/**
 * Класс меню приложения
 */
export class Menu {
  items: MenuItem[];    // Элементы меню

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  add(item: MenuItem, parentUrl?: string): Menu {
    if (parentUrl) {
      const parent = this.items.find((i: MenuItem) => i.url === parentUrl);
      if (parent) {
        parent.children.push(item);
      }
    } else {
      this.items.push(item);
    }
    return new Menu(this.items);
  }
}
