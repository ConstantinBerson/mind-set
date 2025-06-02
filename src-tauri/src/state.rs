use std::sync::Mutex;

use sea_orm::DatabaseConnection;

pub struct DBState {
    pub db:Mutex<Option<DatabaseConnection>>
}