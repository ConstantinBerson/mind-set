pub use sea_orm_migration::prelude::*;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250602_191853_create_note::Migration),
            Box::new(m20250616_080328_create_virtual_note::Migration),
        ]
    }
}
mod m20250602_191853_create_note;
mod m20250616_080328_create_virtual_note;
