// import the client instance (created earlier)
import * as db from '$lib/data_access.js';

// The load function is executed when the page is loaded
// Here it is used to get data for display
export async function load({ fetch, params }) {

	// get all computers
	const computers = await db.get_all_computers();

	// get all events
	const events = await db.get_all_events();

	console.log(events);
  
	// return data to page
	if (computers && events) {
		return {
			computers: computers,
			events: events
		};
	}

	// in case of error - return status code amd message
	return {
		error: 'error occured'
	};
}
