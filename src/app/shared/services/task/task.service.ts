import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Task } from '../../interfaces/task';

const API_URL = `${environment.apiUrl}/api/v1`;   // Βασικό URL για τα API calls

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);     // HttpClient για να κάνουμε HTTP requests

  // SIGNAL STORE
  tasks$ = signal<Task[]>([]);  // κρατάει τη λίστα των tasks σαν signal

  // Φόρτωση tasks από backend και ενημέρωση του signal
  loadTasks() {
    this.getTasks().subscribe(tasks => {
      this.tasks$.set(tasks);
    })
  };

  // API HEADERS / CALLS
  // Δημιουργεί τα headers για κάθε request, περιλαμβάνει JWT, Γλώσσα και API key
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.jwt}`,
      'lang': 'el',
      'ApiKey': environment.apiKey,
      'Content-Type': 'application/json'
    })
  };

  // Ανάκτηση όλων των tasks του userId από το backend
  getTasks(): Observable<Task[]> {
    return this.http.get<any>(
      `${API_URL}/task/?userId=${environment.userId}`,
      { headers: this.getHeaders() }
    )
    .pipe(map(response => response.data))   // Εξάγουμε μόνο το πεδίο data από την απάντηση του API
  };

  // Ενημέρωση status task
  updateTaskStatus(taskId: string, 
                    newStatus: 'to_do' | 'in_progress' | 'in_review' | 'completed'): Observable<any> {
    return this.http.patch(`${API_URL}/task/${taskId}`,
      { status: newStatus },
      { headers: this.getHeaders() }
    )
  };

  // Δημιουργία νέου task
  createTask(task:{ title: string;
                    description: string;
                    priority: number;
                    status: 'to_do';
                    tag_id: string; }) : Observable<Task> {
    return this.http.post<Task>(`${API_URL}/task`,
      task,
      { headers: this.getHeaders() } 
    )
  };

  // Διαγραφή task
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${API_URL}/task/${taskId}`,
      { headers: this.getHeaders() }
    )
  };

  // Επεξεργασία task
  updateTaskFields(taskId: string, updates: Partial<Task>) {
    return this.http.patch(`${API_URL}/task/${taskId}`,
      updates,
      { headers: this.getHeaders()}
    )
  };

  // Κοινές μέθοδοι
  // Επιστρέφει το task status και το αντιστοιχεί με το σωστό status col
  getTasksByStatus(tasks: Task[], status: string) {
   return tasks.filter(task => task.status === status);
  };

  // Ενημερώνει το signal για το συγκεκριμένο task 
  setTaskStatus(taskId: string, newStatus: 'to_do' | 'in_progress' | 'in_review' | 'completed'){
    this.tasks$.update(tasks => tasks.map(t => t._id === taskId ? {...t, status: newStatus} : t))
  };

  // Ενημερώνει το signal για το συγκεκριμένο task 
  setTaskFields(taskId: string, updates: Partial<Task>){
    this.tasks$.update(tasks => tasks.map(t => t._id === taskId ? {...t, ...updates} : t))
  };

}
