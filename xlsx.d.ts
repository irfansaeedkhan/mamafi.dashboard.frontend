declare module 'xlsx' {
  export interface WorkSheet {
    [key: string]: any;
    '!cols'?: Array<{ wch?: number }>;
  }

  export interface WorkBook {
    SheetNames: string[];
    Sheets: { [sheet: string]: WorkSheet };
  }

  export const utils: {
    aoa_to_sheet: (data: any[][]) => WorkSheet;
    book_new: () => WorkBook;
    book_append_sheet: (wb: WorkBook, ws: WorkSheet, name: string) => void;
  };

  export function writeFile(workbook: WorkBook, filename: string): void;
}
