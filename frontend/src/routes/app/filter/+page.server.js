import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`http://${PUBLIC_API_URL}/api/filters`);
	const items = await res.json();

	return {items};
}
export const actions = {
	createFilter: async ({request}) => {
		const data = await request.formData();
		const classroomId = data.get('classroomId');
		const url = data.get('url');
		const ip = data.get('ip');

		const res = await fetch(`http://${PUBLIC_API_URL}/api/filter/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"classroomId": Number.parseInt(classroomId),
				url,
				ip
			})
		})

		await res.json()
	},
	deleteFilter: async ({request}) => {
		const data = await request.formData();
		const filterId = data.get('filterId');

		const res = await fetch(`http://${PUBLIC_API_URL}/api/filter/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"filterId": Number.parseInt(filterId)
			})
		})

		const resp = await res.json()
	}
}