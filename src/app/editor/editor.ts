import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor } from '@tiptap/core';
import { TiptapEditorDirective, TiptapBubbleMenuDirective } from 'ngx-tiptap';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  remixAlignCenter,
  remixAlignLeft,
  remixAlignRight,
  remixAlignJustify,
  remixListOrdered2,
  remixListUnordered,
  remixEmotionFill,
  remixStrikethrough,
  remixUnderline,
  remixItalic,
  remixBold,
  remixResetLeftLine,
  remixResetRightLine,
  remixCodeSSlashLine,
  remixCodeBlock
} from '@ng-icons/remixicon';

@Component({
  selector: 'app-editor',
  imports: [CommonModule, TiptapEditorDirective, NgIcon],
  providers: [provideIcons({ 
    remixAlignCenter,
    remixAlignLeft,
    remixAlignRight,
    remixAlignJustify,
    remixListOrdered2,
    remixListUnordered,
    remixCodeBlock,
    remixCodeSSlashLine,
    remixEmotionFill,
    remixStrikethrough,
    remixUnderline,
    remixItalic,
    remixBold,
    remixResetLeftLine,
    remixResetRightLine
  })],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class NoteEditor implements OnInit, OnDestroy{
  value ='<p>Test tiptap</p>'
  editor: Editor;

   @ViewChild('tiptap') editorElement: any;
  showEmojiPicker = false;
  emojiPickerPosition: { top: number | null; left: number; bottom: number | null } | null = null;
  editorStyle = `
        display: block;
        width: 100%;
        height: 100%;
        padding: .1em 1em;
    `;
  
  constructor(){    
    this.editor = new Editor({
      content: this.value,
      enableCoreExtensions: true,
      extensions: [
        StarterKit,
        TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote', 'listItem', 'bulletList', 'orderedList'],
        defaultAlignment: 'left'
      }),
      Underline
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        style: this.editorStyle
      }
     }
    });
    this.editor.chain().focus().run();
  }
  
  ngOnInit(): void {
  }

  private getCursorScreenPosition(): { top: number; left: number; bottom: number } | null {
    if (!this.editor.view) return null;
    
    const { state } = this.editor.view;
    const { from } = state.selection;
  
    const coords = this.editor.view.coordsAtPos(from);
    
    return {
      top: coords.top,
      left: coords.left,
      bottom: coords.bottom
    };
  }

  toggleEmojiPicker(event: MouseEvent) {
    event.preventDefault();
    
    if (!this.editorElement) return;

    const editorRect = this.editorElement.nativeElement.getBoundingClientRect();
    const cursorPosition = this.getCursorScreenPosition();
    
    if (!cursorPosition) {
      this.emojiPickerPosition = {
        top: editorRect.bottom + 10,
        left: editorRect.left,
        bottom: null
      };
      return;
    }

    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - (cursorPosition.bottom ?? 0);
    const pickerHeight = 300;
    
    if (spaceBelow > pickerHeight || cursorPosition.top < spaceBelow) {
      this.emojiPickerPosition = {
        top: cursorPosition.bottom + 20,
        left: cursorPosition.left,
        bottom: null
      };
    } else {
      this.emojiPickerPosition = {
        top: null,
        left: cursorPosition.left,
        bottom: viewportHeight - cursorPosition.top + 20
      };
    }
  }

  selectEmoji(emoji:Emoji){
    this.editor.chain().focus().insertContent(emoji.emoji);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  } 
}
