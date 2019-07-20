export class FormStep {
  caption: string;
  description: string;
  icon: string;
  isActive: boolean;
  isInvalid: boolean;
  isValid: boolean;

  constructor(caption?: string, description?: string, icon?: string) {
    this.caption = caption ? caption : null;
    this.description = description ? description : null;
    this.icon = icon ? icon : null;
    this.isActive = false;
    this.isInvalid = false;
    this.isValid = false;
  }
}
