import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Event που στέλνει την τρέχουσα τιμή του input στο parent Αpp
  @Output() searchChange = new EventEmitter<string>();  
  dialog = inject(Dialog);       // Αναφορά στο Dialog service για άνοιγμα modals
 

  // Καλείται σε κάθε πληκτρολόγηση στο input
  // Παίρνει την τιμή του input και την στέλνει μέσω του searchChange στο parent App
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  // Ανοίγει το modal για δημιουργία νέου Task
  // Εκτελείται όταν ο χρήστης πατήσει το κουμπί "Νέο Task"
  openTaskForm() {
    this.dialog.open(TaskForm, {
      width: '700px',
      disableClose: true,
    });
  }
}
