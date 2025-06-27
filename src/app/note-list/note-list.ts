import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '@ctrl/ngx-emoji-mart';
import {NoteService} from '../services/note';

@Component({
  selector: 'app-note-list',
  imports: [SearchComponent],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList implements OnInit{
  isCardView = false;
  constructor(private noteService: NoteService){}

  ngOnInit(): void {
  }

  openSearchModal() {
  }
}
