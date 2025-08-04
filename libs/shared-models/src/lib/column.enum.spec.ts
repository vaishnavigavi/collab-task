import { Column, COLUMN_LABELS, COLUMN_ORDER } from './column.enum';

describe('Column Enum', () => {
  it('should have three columns', () => {
    expect(Object.keys(Column)).toHaveLength(3);
  });

  it('should have correct column values', () => {
    expect(Column.TODO).toBe('todo');
    expect(Column.IN_PROGRESS).toBe('in-progress');
    expect(Column.DONE).toBe('done');
  });

  it('should have labels for all columns', () => {
    expect(COLUMN_LABELS[Column.TODO]).toBe('Todo');
    expect(COLUMN_LABELS[Column.IN_PROGRESS]).toBe('In Progress');
    expect(COLUMN_LABELS[Column.DONE]).toBe('Done');
  });

  it('should have correct column order', () => {
    expect(COLUMN_ORDER).toEqual([Column.TODO, Column.IN_PROGRESS, Column.DONE]);
  });
}); 