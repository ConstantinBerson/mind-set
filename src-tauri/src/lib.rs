use std::{process, sync::Mutex};
use futures::executor::block_on;
use utils::db::establish_connection;
use utils::state::DBState;
use tauri::Manager;
use migration::{Migrator, MigratorTrait};

mod utils;
mod entity;
mod commands;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let path_buff = app.path().data_dir().expect("Getting data dir error");
      let path = path_buff.to_str().ok_or("Path to str error").expect("An error occure, can't convert path to str");
      match block_on(establish_connection(path)) {
        Ok(db) =>{
          
          app.manage(DBState{
            db: Mutex::new(Some(db))
          });
        },
        Err(e) =>{
          eprintln!("An error occure, {e}");
          process::exit(1)
        }
      }
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}