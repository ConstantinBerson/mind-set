use std::env;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("environment variable {0} not found")]
    VarNotFound(String),
}

#[derive(Debug, Clone)]
pub struct DatabaseConfig {
    pub url: String,
    pub path: String,
    pub file: String
}

pub fn load_db_config() -> Result<DatabaseConfig, ConfigError> {
    dotenv::dotenv().ok();
    
    Ok(DatabaseConfig {
        url: get_env("DATABASE_URL")?,
        path: get_env("DATABASE_PATH")?,
        file: get_env("DATABASE_FILE")?
    })
}

fn get_env(key: &str) -> Result<String, ConfigError> {
    env::var(key).map_err(|_| ConfigError::VarNotFound(key.to_string()))
}