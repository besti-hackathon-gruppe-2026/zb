/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`http://localhost:8001/api/filters`);
	const items = await res.json();

	return {items};
}