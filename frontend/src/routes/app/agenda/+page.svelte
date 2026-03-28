<script>
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	const timeSlots = [
		'7:30 - 8:15',
		'8:25 - 9:10',
		'9:20 - 10:05',
		'10:25 - 11:10',
		'11:20 - 12:05',
		'12:35 - 13:20',
		'13:30 - 14:15',
		'14:25 - 15:10',
		'15:20 - 16:05',
		'16:15 - 17:00',
		'17:10 - 18:00',
		'18:00 - 19:00',
		'19:00 - 20:00'
	];

	const lessons = [
		{ day: 'Tuesday', time: '9:20 - 10:05', subject: 'History' },
		{ day: 'Wednesday', time: '14:25 - 15:10', subject: 'Physics' },
		{ day: 'Thursday', time: '11:20 - 12:05', subject: 'Exam' },
	];

	const lessonMap = new Map(lessons.map((l) => [`${l.day}-${l.time}`, l]));
</script>

<main>
	<table>
		<thead>
			<tr>
				<th>Time</th>
				{#each days as day}
					<th>{day}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each timeSlots as time}
				<tr>
					<td class="time">{time}</td>

					{#each days as day}
						{@const lesson = lessonMap.get(`${day}-${time}`)}

						<td class:lesson>
							{lesson?.subject}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	main {
		height: calc(100vh - 6rem);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: var(--card-bg, #fff);
		border-radius: 12px;
		overflow: hidden;
		font-size: 0.9rem;
	}

	th {
		background: #f5f7fb;
		color: #555;
		font-weight: 600;
		padding: 14px;

		text-align: center;
		border-bottom: 1px solid #e5e7eb;
	}

	td {
		padding: 12px;
		text-align: center;
		border-bottom: 1px solid #f0f0f0;
		border-right: 1px solid #f3f3f3;
		color: #444;
	}

	th:last-child,
	td:last-child {
		border-right: none;
	}

	.time {
		background: #fafafa;
		color: #777;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.lesson {
		background: #2563eb;
		color: white;
		font-weight: 600;
		border-radius: 6px;
	}

	tr:last-child td {
		border-bottom: none;
	}
</style>
