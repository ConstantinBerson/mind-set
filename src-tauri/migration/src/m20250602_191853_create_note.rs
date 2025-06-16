use sea_orm_migration::{prelude::*, schema::*, sea_orm::{Statement, StatementBuilder}};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Note::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Note::Id)
                            .integer()
                            .primary_key()
                            .auto_increment()
                            .not_null()   
                    )
                    .col(ColumnDef::new(Note::Name).string().not_null())
                    .col(ColumnDef::new(Note::ContentJson).json().not_null())
                    .col(ColumnDef::new(Note::ContentPlain).string().not_null())
                    .col(
                        ColumnDef::new(Note::CreatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp())
                            .not_null()
                    )
                    .col(
                        ColumnDef::new(Note::UpdatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp())
                            .not_null()
                    )
                    .col(
                        ColumnDef::new(Note::Deleted)
                            .boolean()
                            .default(false)
                            .not_null()
                    ).to_owned()
            ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Note::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Note {
    Table,
    Id,
    Name,
    ContentJson,
    ContentPlain,
    CreatedAt,
    UpdatedAt,
    Deleted
}
