import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Tag } from '../../interfaces/tag';

const API_URL = `${environment.apiUrl}/api/v1`    // Βασικό URL για τα API calls

@Injectable({
  providedIn: 'root',
})

export class TagService {
  http: HttpClient = inject(HttpClient)    // HttpClient για να κάνουμε HTTP requests

  // Δημιουργεί τα headers για κάθε request, περιλαμβάνει JWT, Γλώσσα και API key
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.jwt}`,
      'lang': 'el',
      'ApiKey': environment.apiKey,
      'Content-Type': 'application/json'
    })
  }

  // Ανάκτηση όλων των tags από το backend
  getTags(): Observable<Tag[]> {
    return this.http.get<any>( `${API_URL}/tag`, 
      {headers: this.getHeaders()}
    ).pipe(
      map(response => response.data)    // Εξάγουμε μόνο το πεδίο data από την απάντηση του API
    )
  }

  //Κοινές μέθοδοι

  // Επιστρέφει το tag name από το tag_id
  getTagName( tags:Tag[], tag_id: string): string {
    const tag = tags.find(t => t._id === tag_id);
    return tag ? tag.name : 'Unknown tag';
  }
}
