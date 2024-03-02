import { customType, integer, numeric, pgTable, serial, text, varchar  } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('fullName').notNull(),
    lastName: text('lastName'),
    email: varchar('email'),
    pronoun: text("pronoun"),
    profileImage: text("profileImage"),
    backgroundImage: text("backgroundImage"),
    headline: text("headline").notNull(),
    location: text("location"),
    city: text("city"),
    phone: text("phone"),
    website: text("website"),
    address: text("address")
});

export const about = pgTable('about', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    description: text('description')
});

about.description

const customJsonb = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'jsonb';
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    company: text('company').notNull(),
    location: text('location'),
    title: text("title").notNull(),
    startDate: text("startDate").notNull(),
    endDate: text("endDate"),
    description: text("description"),
});

export const educations = pgTable('educations', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    school: text('school').notNull(),
    degree: text('degree').notNull(),
    fieldOfStudy: text('fieldOfStudy'),
    startDate: text('startDate').notNull(),
    endDate: text('endDate'),
    description: text('description'),
});

export const skills = pgTable('skills', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    skill: text('skill').notNull(),
    description: text('description'),
});