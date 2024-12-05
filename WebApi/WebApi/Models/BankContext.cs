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

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

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

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CustomerCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Customers_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CustomerModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_Customers_ModifiedBy");
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

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1A2AAA92F7");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__8A2B61607ABBF49C").IsUnique();

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__User__A9D105348BC03EA0").IsUnique();

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_User_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.InverseModifiedByNavigation)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_User_ModifiedBy");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_RoleId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}