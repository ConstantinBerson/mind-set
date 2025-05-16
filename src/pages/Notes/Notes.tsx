import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import './Note.css'
import { useCurrentEditor } from "@tiptap/react";

function MenuBar(){
    const editor = useCurrentEditor();
    if(!editor){
        return null;
    }

}

export function Notes(){
    let [selectedEmojis,setEmoji]=useState("");
    
    const previewConfig= {
        showPreview: false,
    };

    const selectEmoji = (emojiData:EmojiClickData)=>{
        console.log(emojiData.emoji);
    }
    
    return  <div className="note">
                <header>
                    <div className="btn-group">
                        <button className="btn bold" title="ctrl+b">
                            B
                        </button>
                        <button className="btn italic" title="ctrl+i">
                            I
                        </button>
                        <button className="btn underline" title="Underline">
                            U
                        </button>
                        <button className="btn" title="color">
                            A
                        </button>
                        <button className="btn" title="Character Highliting">
                            A
                        </button>
                        <EmojiPicker previewConfig={previewConfig} reactionsDefaultOpen={true} onEmojiClick={selectEmoji}/>
                    </div>
                </header>
                <form>
                    <textarea name="note-content"/>
                </form>
            </div>
}