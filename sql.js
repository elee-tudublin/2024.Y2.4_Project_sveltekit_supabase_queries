
// https://www.restack.io/docs/supabase-knowledge-supabase-nested-query-guide
const events = await supabase
.from('events')
.select('*, computers(name)')
.order('timestamp', { ascending: true });

console.log(events.data);