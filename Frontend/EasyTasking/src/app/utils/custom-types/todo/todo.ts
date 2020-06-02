export interface Todo {
  taskId: string;
  task: string;
  stage: TodoStage;
  priority: TodoPriority;
  label: TodoLabel;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
