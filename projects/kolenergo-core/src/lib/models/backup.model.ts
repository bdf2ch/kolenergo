export class Backup {

  /**
   * Резервное копирование значений полей объекта
   * @param source - Источник данных
   * @param fields - Поля, значения которых требуется зарезервировать
   */
  static makeBackupable(source: any, fields: string[]) {
    Object.defineProperty(source, 'backup', {
      enumerable: false,
      configurable: true,
      writable: false,
      value: {
        data: {}
      }
    });

    /**
     * Определение функции резервирования значений полей объекта
     */
    Object.defineProperty(source.backup, 'setup', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: (fieldsForBackup: string[]) => {
        fieldsForBackup.forEach((field: string) => {
          if (source.hasOwnProperty(field)) {
            if (!source.backup.data.hasOwnProperty(field)) {
              Object.defineProperty(source.backup.data, field, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: JSON.stringify(source[field])
              });
            } else {
              source[field] = JSON.parse(source.backup.data[field]);
            }
          }
        });
      }
    });

    /**
     * Определение функции восстановления зарезервированных данных
     */
    Object.defineProperty(source.backup, 'restore', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: (fieldsToRestore?: string[]) => {
        if (fieldsToRestore) {
          fieldsToRestore.forEach((field: string) => {
            if (source.backup.data.hasOwnProperty(field) && source.hasOwnProperty(field)) {
              source[field] = JSON.parse(source.backup.data[field]);
            }
          });
        } else {
          for (const field in source.backup.data) {
            source[field] = JSON.parse(source.backup.data[field]);
          }
        }
      }
    });

    /**
     * Определение функции доступа к зарезервированным данным
     */
    Object.defineProperty(source.backup, 'value', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: (field: string) => source.dackup.data.hasOwnProperty(field) ? source.backup.dackup[field] : undefined
    });

    /**
     * Резервирование значений указанных полей объекта
     */
    fields.forEach((field: string) => {
      if (source.hasOwnProperty(field)) {
        Object.defineProperty(source.backup.data, field, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: JSON.stringify(source[field])
        });
      }
    });
  }

  static restore(source: any, fields?: string[]) {
    if (source.hasOwnProperty('backup')) {
      if (fields) {
        fields.forEach((field: string) => {
          if (source.backup.hasOwnProperty(field) && source.hasOwnProperty(field)) {
            source[field] = JSON.parse(source.backup[field]);
          }
        });
      }
    } else {
      return;
    }
  }
}
