import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDelete } from '../task-delete/task-delete';
import { Dialog } from '@angular/cdk/dialog';
import { Task } from 'src/app/shared/interfaces/task';
import { Tag } from 'src/app/shared/interfaces/tag';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { TagService } from 'src/app/shared/services/tag/tag.service';
import { TaskEdit } from '../task-edit/task-edit';
import { TaskDetail } from '../task-detail/task-detail';

@Component({
  selector: 'app-task-board',
  imports: [ CommonModule ],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard {
  @Input() tasks: Task[] = [];  // Λίστα tasks που θα πάρει από τον parent main
  @Input() tags: Tag[] = [];    // Λίστα tags που θα πάρει από τον parent main

  taskService = inject(TaskService);    // Service για την αλληλεπίδραση με το backend για τα tasks
  tagService = inject(TagService);     // Service για την αλληλεπίδραση με το backend για τα tags

  dialog = inject(Dialog);
  
  // Επιστρέφει το tag name από το tag_id
  getTagName(tag_id: string): string {
    return this.tagService.getTagName(this.tags,tag_id)
  };

  // Επιστρέφει το task status και το αντιστοιχεί με το σωστό status col
  getTasksByStatus(status: string) {
    return this.taskService.getTasksByStatus(this.tasks,status);
  };

  // Μετακίνηση tasks από ένα επίπεδο σε ένα άλλο
  moveStatus(task: Task, direction: 'forward' | 'backward') {
    const statuses = ['to_do', 'in_progress', 'in_review', 'completed'];
    const index = statuses.indexOf(task.status);
    if (direction === 'forward' && index < statuses.length - 1) {
      task.status = statuses[index + 1] as Task['status'];
    } else if (direction === 'backward' && index > 0) {
      task.status = statuses[index - 1] as Task['status'];
    }
    this.taskService.updateTaskStatus(task._id, task.status).subscribe({
      next: () => this.taskService.setTaskStatus(task._id, task.status),
      error: (error) => console.log('Failed update task status', error)
    })
  }

  // Ανοίγει το modal για επιβεβαίωση διαγραφής
  openDeleteModal(task: Task) {
    this.dialog.open(TaskDelete, {
      width: '400px',
      disableClose: true,
      data: { task: task, message: `Είστε σίγουροι/ες ότι θέλετε να διαγράψετε το task '${task.title}' ;`}
    });
  }

  // Ανοίγει το modal για επιβεβαίωση διαγραφής
  openEditModal(task: Task) {
    this.dialog.open(TaskEdit, {
      width: '700px',
      disableClose: true,
      data: { task: task, tags: this.tags }
    });
  }

  // Ανοίγει το modal για περισσότερες λεπτομέρειες
  openDetailModal(task: Task) {
    this.dialog.open(TaskDetail, {
      width: '700px',
      disableClose: true,
      data: { task: task, tags: this.tags }
    });
  }
}
