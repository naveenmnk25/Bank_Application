using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models;

public partial class BankContext : DbContext
{
    public BankContext()
    {
    }

    public BankContext(DbContextOptions<BankContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<CustomerAddress> CustomerAddresses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasIndex(e => e.PhoneNumber, "UQ__Customer__85FB4E383BC5126B").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Customer__A9D1053437167918").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.AccountCreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PhoneNumber).HasMaxLength(15);
        });

        modelBuilder.Entity<CustomerAddress>(entity =>
        {
            entity.HasKey(e => e.AddressId);

            entity.Property(e => e.AddressId).HasColumnName("AddressID");
            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PostalCode).HasMaxLength(10);
            entity.Property(e => e.State).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerAddresses)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_CustomerAddresses_Customers");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
