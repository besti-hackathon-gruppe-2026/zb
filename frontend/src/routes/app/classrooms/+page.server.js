export const actions = {
	createClassroom: async ({request}) => {
		const data = await request.formData();
		const classroomName = data.get('classroomName');

		const res = await fetch("http://localhost:8001/api/classroom/create", {
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

		const res = await fetch("http://localhost:8001/api/classroom/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"classroomId": Number.parseInt(classroomId)
			})
		})

		console.log(classroomId)

		const resp = await res.json()
		console.log(resp)
	}
}