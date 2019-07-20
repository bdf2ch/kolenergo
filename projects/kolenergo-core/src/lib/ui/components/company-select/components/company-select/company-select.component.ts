import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { Company, Department } from '../../../../../models';

@Component({
  selector: 'lib-kolenergo-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.less']
})
export class CompanySelectComponent implements OnInit, OnChanges {
  @Input() companies: Company[];
  @Input() label: string;
  @Input() placeholder: string;
  @Input() formAppearance: string;
  @Input() showCompanyShortTitle: boolean;
  @Input() allowChooseDepartments: boolean;
  @Output() companySelected: EventEmitter<{companies: Company[], departments: Department[]}>;
  public companiesControl: FormControl;
  public companyList: Company[];
  public formLabel: string;
  public formPlaceholder: string;
  public appearance: string;
  public companyShortTitle: boolean;
  public withDepartments: boolean;
  public chooseDepartments: boolean;
  public triggerLabel: string;

  constructor() {
    this.companySelected = new EventEmitter();
    this.companiesControl = new FormControl();
    this.companyList = [];
    this.formLabel = null;
    this.formPlaceholder = null;
    this.appearance = 'standard';
    this.companyShortTitle = false;
    this.withDepartments = false;
    this.chooseDepartments = false;
    this.triggerLabel = '';
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('companies') &&  changes.companies.currentValue instanceof Array) {
      this.companyList = changes.companies.currentValue;
    }
    if (changes.hasOwnProperty('label')) {
      this.formLabel = changes.label.currentValue;
    }
    if (changes.hasOwnProperty('placeholder')) {
      this.formPlaceholder = changes.placeholder.currentValue;
    }
    if (changes.hasOwnProperty('formAppearance')) {
      this.appearance = changes.formAppearance.currentValue;
    }
    if (changes.hasOwnProperty('showCompanyShortTitle')) {
      this.companyShortTitle = changes.showCompanyShortTitle.currentValue;
    }
    if (changes.hasOwnProperty('allowChooseDepartments')) {
      this.withDepartments = changes.allowChooseDepartments.currentValue;
    }
  }

  /**
   * Изменение выбора организаций или подразделений орагнизаций
   * @param event - Событие изменения выбора
   */
  selectionChanged(event: MatSelectChange) {
    this.triggerLabel = '';
    if (this.chooseDepartments) {
      const departments: Department[] = event.value;
      const companies: {company: Company, departments: string[]}[] = [];
      departments.forEach((department: Department ) => {
        const findCompanyById = (item: Company) => item.id === department.companyId;
        const company = this.companyList.find(findCompanyById);
        const findCompanyTriggerById = (item: {company: Company, departments: string[]}) => item.company.id === company.id;
        const companyTrigger = companies.find(findCompanyTriggerById);
        if (!companyTrigger) {
          companies.push({company, departments: new Array(department.shortTitle)});
        } else {
          companyTrigger.departments.push(department.shortTitle);
        }
      });
      companies.forEach((item: {company: Company, departments: string[]}, index: number) => {
        this.triggerLabel += `${item.company.shortTitle}: ${item.departments.join(', ')} ${index < companies.length - 1 ? '; ' : ''}`;
      });
    } else {
      const values: Company[] = event.value;
      values.forEach((company: Company, index: number) => {
        this.triggerLabel += `${company.shortTitle} ${index < values.length - 1 ? ', ' : ''}`;
      });
    }
    this.companySelected.emit({
      companies: this.chooseDepartments ? [] : event.value,
      departments: this.chooseDepartments ? event.value : []
    });
  }

  /**
   * Изменение режима отображения подразделений органимзаций
   */
  changeMode() {
    this.companiesControl.reset();
    this.companySelected.emit({companies: [], departments: []});
  }
}
