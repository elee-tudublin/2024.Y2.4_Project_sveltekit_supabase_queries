// @ts-nocheck
// import the client instance (created earlier)
import * as db from '$lib/data_access.js';

// The load function is executed when the page is loaded
// Here it is used to get data for display
export async function load({ fetch, params }) {

    let events;

    if (params.event_id) {
        events = await db.get_event_by_id(params.event_id)
    }

  
	// return data to page
	if (events) {
		return {
			events: events
		};
	}

	// in case of error - return status code amd message
	return {
		error: 'error occured'
	};
}
