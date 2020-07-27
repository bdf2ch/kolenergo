export class MenuItem {
  title: string;
  icon: string;
  url: string;
  isExpanded: boolean;
  children: MenuItem[];

  constructor(title: string, url: string, children: MenuItem[], icon?: string) {
    this.title = title;
    this.url = url;
    this.children = children;
    this.icon = icon ? icon : null;
  }

  /**
   * Открытие / закрытие подменю
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Открытие подменю
   */
  toggleRoot() {
    this.isExpanded = true;
  }
}
