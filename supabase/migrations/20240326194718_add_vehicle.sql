create table "public"."vehicle" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid()
);


alter table "public"."vehicle" enable row level security;

CREATE UNIQUE INDEX vehicle_pkey ON public.vehicle USING btree (id);

alter table "public"."vehicle" add constraint "vehicle_pkey" PRIMARY KEY using index "vehicle_pkey";

alter table "public"."vehicle" add constraint "public_vehicle_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."vehicle" validate constraint "public_vehicle_user_id_fkey";

grant delete on table "public"."vehicle" to "anon";

grant insert on table "public"."vehicle" to "anon";

grant references on table "public"."vehicle" to "anon";

grant select on table "public"."vehicle" to "anon";

grant trigger on table "public"."vehicle" to "anon";

grant truncate on table "public"."vehicle" to "anon";

grant update on table "public"."vehicle" to "anon";

grant delete on table "public"."vehicle" to "authenticated";

grant insert on table "public"."vehicle" to "authenticated";

grant references on table "public"."vehicle" to "authenticated";

grant select on table "public"."vehicle" to "authenticated";

grant trigger on table "public"."vehicle" to "authenticated";

grant truncate on table "public"."vehicle" to "authenticated";

grant update on table "public"."vehicle" to "authenticated";

grant delete on table "public"."vehicle" to "service_role";

grant insert on table "public"."vehicle" to "service_role";

grant references on table "public"."vehicle" to "service_role";

grant select on table "public"."vehicle" to "service_role";

grant trigger on table "public"."vehicle" to "service_role";

grant truncate on table "public"."vehicle" to "service_role";

grant update on table "public"."vehicle" to "service_role";


