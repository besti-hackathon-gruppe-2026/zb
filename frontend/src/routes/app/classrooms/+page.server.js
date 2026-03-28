import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`${PUBLIC_API_URL}/api/classrooms`);
	const items = await res.json();

	return {items};
}
export const actions = {
	createClassroom: async ({request}) => {
		const data = await request.formData();
		const classroomName = data.get('classroomName');

		const res = await fetch(`${PUBLIC_API_URL}/api/classroom/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"classroomName": classroomName
			})
		})

		await res.json()
	},
	deleteClassroom: async ({request}) => {
		const data = await request.formData();
		const classroomId = data.get('classroomId');

		const res = await fetch(`${PUBLIC_API_URL}/api/classroom/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"classroomId": Number.parseInt(classroomId)
			})
		})

		const resp = await res.json()
	}
}