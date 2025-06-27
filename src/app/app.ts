import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteEditor } from './editor/editor';
import { NoteList } from './note-list/note-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NoteEditor, NoteList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mind-set';
}
