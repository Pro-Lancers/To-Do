import { TodoStage } from './todo-stage';
import { TodoPriority } from './todo-priority';
import { TodoLabel } from './todo-label';

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
