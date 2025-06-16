use sea_orm_migration::{prelude::*, schema::*, sea_orm::Statement};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();
        let stmt = Statement::from_string(
                        manager.get_database_backend(),
                        "
                            CREATE VIRTUAL TABLE note_fts USING fts5(
                                name,
                                content_plain,
                                content='note',
                                content_rowid='id' 
                            );
                        "                        
                    );
        db.execute(stmt).await.expect("Virtual Table creation error");

        let stmt = Statement::from_string(
                        manager.get_database_backend(),
                        "
                            CREATE TRIGGER note_ai AFTER INSERT ON note BEGIN
                                INSERT INTO note_fts(rowid, name, content_plain)
                                VALUES (new.id, new.name, new.content_plain);
                            END;
                        "
                        );
        db.execute(stmt).await.expect("After insert Trigger creation error");

        let stmt = Statement::from_string(
                        manager.get_database_backend(),
                        "
                            CREATE TRIGGER note_ad AFTER DELETE ON note BEGIN
                                INSERT INTO note_fts(note_fts,rowid, name, content_plain)
                                VALUES ('delete', old.id, old.name, old.content_plain);
                            END;
                        "
                        );
        db.execute(stmt).await.expect("After delete Trigger creation error");

        let stmt = Statement::from_string(
                        manager.get_database_backend(),
                        "
                            CREATE TRIGGER note_au AFTER UPDATE ON note BEGIN
                                INSERT INTO note_fts(note_fts,rowid, name, content_plain)
                                VALUES ('delete', old.id, old.name, old.content_plain);
                                INSERT INTO note_fts(rowid, name, content_plain)
                                VALUES (new.id, new.name, new.content_plain);
                            END;
                        "
                        );
        db.execute(stmt).await.expect("After update Trigger creation error");
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Note_FTS::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Note_FTS {
    Table,
    Rowid,
    Name,
    ContentPlain,
}
