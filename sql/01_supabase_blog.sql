-- Enable UUID
create extension if not exists "uuid-ossp";

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete set null,
  author text,
  title text not null,
  excerpt text,
  content text,
  category text,
  image text,
  status text check (status in ('draft','published')) default 'published',
  likes int default 0,
  comments int default 0,
  slug text unique not null,
  read_time text,
  animal_type text,
  affiliate_products jsonb
);

create table if not exists animal_types (
  id int primary key,
  name text not null,
  icon text not null,
  color text not null
);

alter table blog_posts enable row level security;
alter table animal_types enable row level security;

-- Policies: everyone can read posts; only owner can write.
create policy "blog_posts_select_public" on blog_posts
for select using (true);

create policy "blog_posts_write_own" on blog_posts
for all
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

-- animal_types: restrict writes to authenticated; reads public
create policy "animal_types_select_public" on animal_types
for select using (true);

create policy "animal_types_write_auth" on animal_types
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
