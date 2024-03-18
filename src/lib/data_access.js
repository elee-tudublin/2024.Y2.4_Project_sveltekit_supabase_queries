// @ts-nocheck



/* Useful links and guides for building Supabase queries

*** IMPORTANT: Read the API docs for your database in the Supabase dashboard ***

select:         https://www.restack.io/docs/supabase-knowledge-supabase-api-select-guide#clpx3g95y0g2xvh0vwuz164y1

where:          https://www.restack.io/docs/supabase-knowledge-supabase-client-raw-sql-guide

1-to-m/ m-to-m: https://www.restack.io/docs/supabase-knowledge-supabase-nested-query-guide
                https://github.com/orgs/supabase/discussions/7958

filter queries: https://supabase.com/docs/reference/javascript/filter
                https://www.restack.io/docs/supabase-knowledge-supabase-filter-guide

sort:           https://www.restack.io/docs/supabase-knowledge-supabase-select-sort-guide#clpzufwv80mklvh0v4bcbkn5f
                https://stackoverflow.com/questions/77049329/how-to-order-by-multiple-columns-in-supabase

ilike :         https://github.com/orgs/supabase/discussions/6778      
*/


// Use the queries below as templates for you project

// import supabase client
import {supabase} from './supabase.js'

// Get all computers via Supabase API
export async function get_all_computers() {
	const result = await supabase
	.from('computers')
	.select('*')
	.order('name', { ascending: true });

    // log errors
    if (result.error) {
        console.log(`get all computers error: ${result.error}`);
    }

    // return data
    return result.data;
}

// Get all events via Supabase API
export async function get_all_events(order_col = 'timestamp', order_dir= true) {
	const result = await supabase
	.from('events')
    // select computer name from computers table - requires valid one-many setup  
	.select('*, computers(name)')
	.order(order_col, { ascending: order_dir });

    // log errors
    if (result.error) {
        console.log(`get all events error: ${result.error}`);
    }

    // return data
    return result.data;

}

// Get all events by computerid via Supabase API
export async function get_events_by_computer_id(computer_id) {
    const result = await supabase
	.from('events')
    // select computer name from computers table - requires valid one-many setup  
	.select('*, computers(name)')
    .eq('computer_id', computer_id)
	.order('timestamp', { ascending: true });

    // log errors
    if (result.error) {
        console.log(`get all events error: ${result.error}`);
    }

    // return data
    return result.data;
    
}

// delete event - no data returned by supabase
export async function delete_event_by_id(event_id) {

    const result = await supabase
	.from('events')
    // select computer name from computers table - requires valid one-many setup  
	.delete()
    .eq('id', event_id);

    // log errors
    if (result.error) {
        console.log(`get all events error: ${result.error}`);
        return false;
    }

    // no error
    return true;
}

// Search events
// uses .or and ilike to search multiple columns
export async function search_events(search_text) {
    const result = await supabase
	.from('events')
    // select computer name from computers table - requires valid one-many setup  
	.select('*, computers(name)')
    .or (`description.ilike.%${search_text}%,level.ilike.%${search_text}%`)
	.order('timestamp', { ascending: true });

    // log errors
    if (result.error) {
        console.log(`get all events error: ${result.error}`);
    }

    // return data
    return result.data;
    
}

// Get details for a single event by id
export async function get_event_by_id(id) {
    const result = await supabase
	.from('events')
    // select computer name from computers table - requires valid one-many setup  
	.select('*, computers(*)')
    .eq('id', id);

    // log errors
    if (result.error) {
        console.log(`get all events error: ${result.error}`);
    }

    // return data
    return result.data;
}