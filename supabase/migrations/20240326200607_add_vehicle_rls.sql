create policy "Enable insert for users based on user_id"
on "public"."vehicle"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable read access for authenticated users"
on "public"."vehicle"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



