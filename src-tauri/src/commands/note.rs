use tauri::Runtime;

use crate::{entity::prelude::Note, utils::{db::get_db_connection, state}};

#[tauri::command]
async fn create_note<R: Runtime>(
    note: Note, 
    app: tauri::AppHandle<R>, 
    window: tauri::Window<R>,
    state: tauri::State<'_,state::DBState>
) -> Result<String, String> {
    let db_guard = get_db_connection(&state).expect("AN error occure, can't get connection");
    let conn = db_guard.as_ref().ok_or_else(|| "An error occure, can't lock the connection mutex").map_err(|e| e.to_string())?;
    Ok(String::from("Note created"))
}