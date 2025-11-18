import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Tag } from 'src/app/shared/interfaces/tag';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/shared/services/tag/tag.service';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  dialogRef = inject(DialogRef);        // Αναφορά στο Dialog service για να χειριστούμε το modal
  
  taskService = inject(TaskService);
  tagService = inject(TagService);
  
  // Δεδομένα που περνάνε στο modal
  data = inject(DIALOG_DATA) as { task: Task, tags: Tag[] };    

  // Δημιουργία φόρμας με τις αρχικές τιμές του task
  taskForm = new FormGroup({
      title: new FormControl(this.data.task.title, Validators.required),
      description: new FormControl(this.data.task.description, Validators.required),
      tag: new FormControl(this.data.task.tag_id, Validators.required),
      priority: new FormControl(this.data.task.priority, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ])
  });
  
  // Κλείνει το modal χωρίς να επιβεβαιωθεί η διαγραφή
  closeDialog(){
    this.dialogRef.close();
  };
  

  // Format για το status
  statusDisplayName(status: string): string {
    return status.split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
  };

  // Επιστρέφει το tag name από το tag_id
  getTagName(tag_id: string): string {
    return this.tagService.getTagName(this.data.tags,tag_id)
  };
}
