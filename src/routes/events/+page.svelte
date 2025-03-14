<script>
	// @ts-nocheck

	// import the client instance (created earlier)
	import * as db from '$lib/data_access.js';
	import { format_timestamp } from '$lib/utilities.js';

	// import writable stores
	// used here to make the events list 'reactive' to support sorting
	import { writable } from 'svelte/store';

	// get data returned during page load
	export let data;

	// get data
	let computers = data.computers;

	let search_text = '';

	// make events a 'store' (for reactivity when sorting)
	// use spread operator (...) to add each evernt to the events 'store'
	let events = writable([...data.events]);

	// Request  Supabase to select * from events where computer_id = filter_id
	async function filterByComputer(filter_id = 0) {
		// a variable for supabase result
		let comp_events = [];

		// if param value > 0 then get events for the computer selected
		// select * from events where computer_id = filter_id
		if (filter_id > 0) {
			comp_events = await db.get_events_by_computer_id(filter_id);
		} else {
			// if filter_id = 0 get all events
			comp_events = await db.get_all_events();
		}
		console.log('comp events: ', comp_events);
		// set events to the filtered data
		$events = comp_events;
	}

	// Handle search button event
	async function search_events() {
		if (search_text == '') {
			alert(`invalid search`);
			return false;
		}
		const result = await db.search_events(search_text);

		$events = result;
	}

	// Handle delete button events
	async function delete_event(id = 0) {
		if (isNaN(id)) {
			alert(`cannot delete event with invalid ID`);
			return false;
		}

		if (confirm(`Permanently deleting product with ID= ${id}\n\nAre you sure?`)) {
			const result = await db.delete_event_by_id(id);
			alert(`Event with id ${id} deleted`);
		}
		return true;
	}

	//  keep track of sort directions for each col
	const table_sort = {
		id: false,
		timestamp: false,
		computer_id: false,
		description: false,
		level: false
	};

	// get events sorted based a given column
	async function sort_by_col(col) {
		let db_sort_col = col;

		// reverse current sort direction for this col
		// i.e. reverse the current order
		table_sort[col] = !table_sort[col];

		const sorted = await db.get_all_events(db_sort_col, table_sort[col]);

		$events = sorted;

		// output to the  browser console
		console.log(`${col} : ${table_sort[col]}`);
	}
</script>

<!-- The HTML content of the page-->

<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Events Log from Supabase</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="computers" class="list-group">
				<!-- computer links -->
				<button on:click={filterByComputer} class="list-group-item list-group-item-action">
					All Computers
				</button>
				{#each computers as computer}
					<button
						on:click={() => {
							filterByComputer(Number(computer.id));
						}}
						class="list-group-item list-group-item-action"
					>
						{computer.name}
					</button>
				{/each}
			</div>
		</div>
		<!-- End computer col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->

			<!-- search box -->
			<form>
				<div class="row m-4">
					<div class="col-md-4 d-flex">
						<input
							type="text"
							bind:value={search_text}
							class="form-control"
							name="search"
							placeholder="search Events"
						/>
					</div>
					<!-- submit button -->
					<div class="col-md-1">
						<button on:click={search_events} class="btn btn-primary">Search</button>
					</div>
				</div>
			</form>

			<div id="events">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th class="click-text" on:click={() => sort_by_col('id')}>
								<!-- button icon CSS class is set by checking if the table_sort value for the column is true (bi-sort-down) or false (bi-sort-up)-->
								<i class={table_sort['id'] ? 'bi bi-sort-down' : 'bi bi-sort-up'}></i>ID</th>
							
							<th class="click-text" on:click={() => sort_by_col('timestamp')}>
								<i class={table_sort['timestamp'] ? 'bi bi-sort-down' : 'bi bi-sort-up'}>
								</i>Time</th>
							
							<th class="click-text" on:click={() => sort_by_col('computer_id')}>
								<i class={table_sort['computer_id'] ? 'bi bi-sort-down' : 'bi bi-sort-up'}>
								</i>Computer</th>
							
							<th class="click-text" on:click={() => sort_by_col('description')}>
								<i class={table_sort['description'] ? 'bi bi-sort-down' : 'bi bi-sort-up'}>
								</i>Description</th>
							
							<th>Level</th>
							<th>Service</th>
							<th>Type</th>
							<th>User</th>
						</tr>
					</thead>
					<tbody>
						<!-- Note use of $events -->
						{#each $events as event}
							<tr>
								<td><a href="/event_details/{event.id}">{event.id}</a></td>
								<td>{format_timestamp(event.created_at)}</td>
								<td>{event.computers.name}</td>
								<td>{event.description}</td>
								<td>{event.level}</td>
								<td>{event.service}</td>
								<td>{event.type}</td>
								<td>{event.user}</td>
								<td>
									<button aria-label="delete" on:click={() => delete_event(event.id)} class="btn btn-sm btn-outline-danger">
										<span class="bi bi-trash"></span>
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<!-- End events col -->
	</div>
	<!-- End Row -->
</div>
<!-- End Main Content-->
