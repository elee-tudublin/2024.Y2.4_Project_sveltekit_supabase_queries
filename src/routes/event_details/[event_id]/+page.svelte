<script>
	// @ts-nocheck

	import { format_timestamp } from '$lib/utilities.js';

	export let data;

	const events = data.events;

	console.log(events);
</script>

<h2>Event details</h2>

<h4>Computer</h4>

<div class="table-responsive-md">
	<table class="table table-striped">
		<tbody>
			<tr>
				<th>id</th>
				<td>{events[0].computers.id}</td>
			</tr>
			<tr>
				<th>name</th>
				<td>{events[0].computers.name}</td>
			</tr>
			<tr>
				<th>description</th>
				<td>{events[0].computers.description}</td>
			</tr>
			<tr>
				<th>location</th>
				<td>{events[0].computers.location}</td>
			</tr>
			<tr>
				<th>created</th>
				<td>{format_timestamp(events[0].computers.created_at)}</td>
			</tr>
		</tbody>
	</table>
</div>

<h4>Event</h4>
<div class="table-responsive-md">
	<table class="table table-striped">
		<tbody>
			<tr>
				<th>id</th>
				<td>{events[0].id}</td>
			</tr>
			<tr>
				<th>timestamp</th>
				<td>{format_timestamp(events[0].timestamp)}</td>
			</tr>
			<tr>
				<th>level</th>
				<td>{events[0].level}</td>
			</tr>
			<tr>
				<th>description</th>
				<td>{events[0].description}</td>
			</tr>
			<tr>
				<th>service</th>
				<td>{events[0].service}</td>
			</tr>
			<tr>
				<th>User</th>
				<td>{events[0].user}</td>
			</tr>
		</tbody>
	</table>
</div>
