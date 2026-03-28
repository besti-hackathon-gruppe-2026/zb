export const actions = {
	createFilter: async ({request}) => {
		const data = await request.formData();
		const classroomId = data.get('classroomId');
		const url = data.get('url');
		const ip = data.get('ip');

		const res = await fetch("http://localhost:8001/api/filter/create", {
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

		const res = await fetch("http://localhost:8001/api/filter/delete", {
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