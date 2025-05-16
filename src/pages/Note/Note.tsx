"use client";
import './style.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { TextStyle } from '@tiptap/extension-text-style'
import { EditorEvents, EditorProvider, useCurrentEditor } from '@tiptap/react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react';
import { 
  FaBold,
  FaUnderline,
  FaItalic,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaCode,
  FaQuoteLeft,
  FaParagraph
} from "react-icons/fa6";
import { BiCodeBlock, BiFontColor, BiFontSize } from "react-icons/bi";
import {ImRedo2, ImUndo2} from "react-icons/im"
import { ToggleGroup } from '../../components/ui/toggle-group';
import { Toggle } from '../../components/ui/toggle';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';


const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
        bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

let content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`
const update=(pros:EditorEvents["update"])=>{
      content = pros.editor.getHTML();
}

export function Note(){
  const [showPicker, setPickerVisibility] = useState(false);

  const [headerLevel, setHeaderLevel] = useState(1)

  const emojiPickerStyleSheet={
    display: !showPicker ? "none" : undefined
  }

  const updateHeaderLevel = (level:string) => {
        setHeaderLevel(Number.parseInt(level))
  }

  const updatePickerVisibility = (val:boolean)=>{
    console.log(val);
    
        setPickerVisibility(val)
  }
  const MenuBar = () => {
    const { editor } = useCurrentEditor()  
    if (!editor) {
      return null
    }
  
    return (
      <div className="control-group">
          <div className="button-group">
            
            <ToggleGroup type="multiple">
              <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can()
                    .chain()
                    .focus()
                    .undo()
                    .run()}
                >
                <ImUndo2/>
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can()
                  .chain()
                  .focus()
                  .redo()
                  .run()}
                >
                <ImRedo2/>
              </button>
              <Toggle 
                value="bold" 
                disabled={!editor.can()
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
                }
                onClick={()=> editor.chain().focus().toggleBold().run()}
              >
                <FaBold className="h-4 w-4"/>
              </Toggle>

              <Toggle value="italic">
                <FaItalic className="h-4 w-4"/>
              </Toggle>
                <Toggle value="underline">
                  <FaUnderline/>
                </Toggle>
              <Toggle value="italic">
                <FaStrikethrough className="h-4 w-4"/>
              </Toggle>
            </ToggleGroup>
            <Toggle
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              <FaCode/>
            </Toggle>
            <Toggle
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              Header
            </Toggle>
            
            <Select onValueChange={updateHeaderLevel} value={headerLevel.toString()}>
              <SelectTrigger>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Toggle
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <FaListUl/>
            </Toggle>
            <Toggle
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <FaListOl/>
            </Toggle>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <BiCodeBlock/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <FaQuoteLeft/>
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Horizontal rule
            </button>
            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
              <FaParagraph/>
            </button>
            
            <button 
              onClick={()=>updatePickerVisibility(true)}
            >
              Emoji
            </button>
          </div>
        </div>
      
    )
  }
  return (
    <>
      <div className="emoji-picker-container" style={emojiPickerStyleSheet}>
        <Picker data={data} 
                dynamicWidth={true} 
                previewPosition="none" 
                navPosition="bottom" 
                emojiSize="18" 
                emojiButtonRadius=".25em"
                onClickOutside = {()=>{
                  if (showPicker) updatePickerVisibility(false)
                }}
            />
      </div>
      <EditorProvider slotBefore={<MenuBar />} onUpdate={update} extensions={extensions} content={content} ></EditorProvider>
    </>
    
  )
}