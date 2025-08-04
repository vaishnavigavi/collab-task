export enum Column {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export const COLUMN_LABELS: Record<Column, string> = {
  [Column.TODO]: 'Todo',
  [Column.IN_PROGRESS]: 'In Progress',
  [Column.DONE]: 'Done'
};

export const COLUMN_ORDER: Column[] = [
  Column.TODO,
  Column.IN_PROGRESS,
  Column.DONE
]; 