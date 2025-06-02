use std::{path, fs};
use sea_orm::{Database, DatabaseConnection};

use crate::config::load_db_config;

pub async fn establish_connection(path:&str)->Result<DatabaseConnection,String>{
    if !path::Path::new(path).exists() {
        if let Err(e) = fs::create_dir(path) {
            return Err(String::from("Can't create app data dir"));
        }
    }
    let db_config = match load_db_config() {
        Ok(config) => config,
        Err(e) => return Err(format!("An error occure, {e}")),
    };
    let db = Database::connect(
                            format!("sqlite://{0}/{1}/{2}?mode=rwc",path,db_config.path,db_config.file)
                        ).await.expect("Connection failed");
                        
    Ok(db)
}
