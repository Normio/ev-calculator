alter table "public"."vehicle" add column "brand" text;

alter table "public"."vehicle" add column "model" text;

alter table "public"."vehicle" add column "vehicle_type" text not null default 'electric'::text;


