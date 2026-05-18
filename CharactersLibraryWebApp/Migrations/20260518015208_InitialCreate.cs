using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CharactersLibraryWebApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Elements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Elements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeaponTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeaponTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Rarity = table.Column<int>(type: "integer", nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WeaponTypeId = table.Column<int>(type: "integer", nullable: false),
                    ElementId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Characters_WeaponTypes_WeaponTypeId",
                        column: x => x.WeaponTypeId,
                        principalTable: "WeaponTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Talents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TalentType = table.Column<string>(type: "text", nullable: true),
                    CharacterId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Talents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Talents_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Elements",
                columns: new[] { "Id", "Color", "Name" },
                values: new object[,]
                {
                    { 1, "#FF4500", "Pyro" },
                    { 2, "#1E90FF", "Hydro" },
                    { 3, "#00CED1", "Anemo" },
                    { 4, "#9400D3", "Electro" },
                    { 5, "#228B22", "Dendro" },
                    { 6, "#ADD8E6", "Cryo" },
                    { 7, "#FFD700", "Geo" }
                });

            migrationBuilder.InsertData(
                table: "WeaponTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Sword" },
                    { 2, "Bow" },
                    { 3, "Catalyst" },
                    { 4, "Claymore" },
                    { 5, "Polearm" }
                });

            migrationBuilder.InsertData(
                table: "Characters",
                columns: new[] { "Id", "Description", "ElementId", "Name", "Rarity", "ReleaseDate", "Title", "WeaponTypeId" },
                values: new object[,]
                {
                    { 1, "The 77th Director of the Wangsheng Funeral Parlor.", 1, "Hu Tao", 5, new DateTime(2021, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director of the Wangsheng Funeral Parlor", 5 },
                    { 2, "Her Excellency, the Almighty Narukami Ogosho.", 4, "Raiden Shogun", 5, new DateTime(2021, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Plane of Euthymia", 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Characters_ElementId",
                table: "Characters",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_WeaponTypeId",
                table: "Characters",
                column: "WeaponTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Talents_CharacterId",
                table: "Talents",
                column: "CharacterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Talents");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Elements");

            migrationBuilder.DropTable(
                name: "WeaponTypes");
        }
    }
}
