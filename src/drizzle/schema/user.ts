export const UserTabe=pgTable("users",{
        id:varchar().primaryKey(),
        name:varchar().notNull(),
        imageUrl:varchar().notNull(),
        email:varchar().notNull().unique(),
        createdAt,
        updatedAt


})