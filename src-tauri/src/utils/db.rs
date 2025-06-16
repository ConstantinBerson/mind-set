use std::{path, fs};
use sea_orm::{Database, DatabaseConnection};

use crate::utils::{self, config::load_db_config, state::{self, DBState}};

pub async fn establish_connection(path:&str)->Result<DatabaseConnection,String>{
    let db_config = match load_db_config() {
        Ok(config) => config,
        Err(e) => return Err(format!("An error occure, {e}")),
    };
    let app_data_dir= &format!("{0}/{1}",path,db_config.path);
    if !path::Path::new(app_data_dir).exists() {
        if let Err(e) = fs::create_dir(app_data_dir) {
            eprint!("{}",e);
            return Err(String::from("Can't create app data dir."));
        }
    }
    
    let db = Database::connect(
                            format!("sqlite://{0}/{1}?mode=rwc",app_data_dir,db_config.file)
                        ).await.expect("Connection failed");
    Ok(db)
}

pub fn get_db_connection<'a>(state: &'a tauri::State<utils::state::DBState>) 
    -> Result<std::sync::MutexGuard<'a,Option<DatabaseConnection>>,String>{
    let db_guard = state.db.lock().
    map_err(|_| String::from("Failed to lock database state"))?;
    Ok(db_guard)
}