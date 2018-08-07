﻿// <auto-generated />
using FinalProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace FinalProject.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FinalProject.Models.StockPurchaseEntry", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnName("id");

                    b.Property<decimal>("Amount_Paid")
                        .HasColumnType("money");

                    b.Property<string>("Company_Name")
                        .HasColumnName("company_name")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.Property<DateTime>("Created_At")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("created_at")
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<decimal>("Purchased_Amount")
                        .HasColumnName("purchased_amount")
                        .HasColumnType("decimal(28, 14)");

                    b.Property<int>("UsersId")
                        .HasColumnName("UsersId");

                    b.HasKey("Id");

                    b.HasIndex("UsersId");

                    b.ToTable("stock_purchase_entry");
                });

            modelBuilder.Entity("FinalProject.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnName("id");

                    b.Property<decimal>("Amount")
                        .HasColumnName("amount")
                        .HasColumnType("money");

                    b.Property<DateTime>("Created_At")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("created_at")
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<string>("Pword")
                        .IsRequired()
                        .HasColumnName("pword")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnName("username")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("FinalProject.Models.StockPurchaseEntry", b =>
                {
                    b.HasOne("FinalProject.Models.Users", "Users")
                        .WithMany("StockPurchaseEntry")
                        .HasForeignKey("UsersId")
                        .HasConstraintName("FK__stock_pur__users__4CA06362");
                });
#pragma warning restore 612, 618
        }
    }
}