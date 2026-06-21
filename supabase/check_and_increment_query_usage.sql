-- Run this once in the Supabase SQL Editor.
-- Atomically checks the daily free-tier limit and increments query_count in a
-- single statement, so concurrent requests from the same IP can't both read
-- the same count before either write lands and bypass the cap.
create or replace function check_and_increment_query_usage(p_ip_address text, p_limit integer)
returns json
language plpgsql
as $$
declare
  v_today date := current_date;
  v_count integer;
begin
  loop
    update query_usage
    set
      query_count = case when last_reset::date <> v_today then 1 else query_count + 1 end,
      last_reset = case when last_reset::date <> v_today then now() else last_reset end
    where ip_address = p_ip_address
      and (last_reset::date <> v_today or query_count < p_limit)
    returning query_count into v_count;

    if found then
      return json_build_object('allowed', true, 'query_count', v_count);
    end if;

    if exists (select 1 from query_usage where ip_address = p_ip_address) then
      select query_count into v_count from query_usage where ip_address = p_ip_address;
      return json_build_object('allowed', false, 'query_count', v_count);
    end if;

    begin
      insert into query_usage (ip_address, query_count, last_reset)
      values (p_ip_address, 1, now());
      return json_build_object('allowed', true, 'query_count', 1);
    exception when unique_violation then
      -- another concurrent request inserted this ip_address first; retry the update
    end;
  end loop;
end;
$$;
