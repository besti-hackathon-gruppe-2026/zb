import { PUBLIC_API_URL } from '$env/static/public';
import { error, fail } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const res = await fetch(`${PUBLIC_API_URL}/api/classrooms`);
	const items = await res.json();

	return { items };
}
export const actions = {
	createClassroom: async ({ request }) => {
		const data = await request.formData();
		const classroomName = data.get('classroomName');

		if (!classroomName) {
			return fail(400, { message: 'Classroom name is required.' });
		}

		const req = await fetch(`${PUBLIC_API_URL}/api/classroom/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				classroomName: classroomName
			})
		});

		if (!req.ok) {
			return fail(req.status, { message: 'Internal server error.' });
		}
	},
	deleteClassroom: async ({ request }) => {
		const data = await request.formData();
		const classroomId = data.get('classroomId');

		if (!classroomId) {
			return fail(400, { message: 'Classroom not found.' });
		}

		const req = await fetch(`${PUBLIC_API_URL}/api/classroom/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				classroomId: Number.parseInt(classroomId as string)
			})
		});

		if (!req.ok) {
			return fail(req.status, { message: 'Internal server error.' });
		}
	}
};
