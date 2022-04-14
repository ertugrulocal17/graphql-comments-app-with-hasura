alter table "public"."commnets"
  add constraint "commnets_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete cascade;
