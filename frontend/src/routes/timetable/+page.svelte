<script>
  // Days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Custom time slots
  const hours2 = [
    "7:30 - 8:15",
    "8:25 - 9:10",
    "9:20 - 10:05",
    "10:25 - 11:10",
    "11:20 - 12:05",
    "12:35 - 13:20",
    "13:30 - 14:15",
    "14:25 - 15:10",
    "15:20 - 16:05",
    "16:15 - 17:00",
    "17:10 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00"
  ];

  // Example lessons, now using hours2 strings as keys
  const lessons = {
    "Monday-7:30 - 8:15": "Math",
    "Monday-8:25 - 9:10": "English",
    "Tuesday-9:20 - 10:05": "History",
    "Wednesday-14:25 - 15:10": "Physics",
    "Thursday-11:20 - 12:05": "Chemistry",
    "Friday-13:30 - 14:15": "Art",
  };
</script>

<style>
  body {
    background-color: #f0f0f0;
    font-family: 'Segoe UI', Roboto, sans-serif;
    color: #000;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 400;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 90%;
    margin: auto;
    text-align: center;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff; /* table background white */
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  th, td {
    padding: 12px;
    min-width: 120px;
    height: 20px;
    font-size: 0.9rem;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  th:last-child, td:last-child {
    border-right: none;
  }

  th {
    background-color: #000; /* header black */
    color: #fff;
    font-weight: 500;
    font-weight: bold;
  }

  td:first-child {
    min-width: 90px;
    font-size: 0.85rem;
    background-color: #000; /* left column black */
    color: #fff;
    font-weight: bold;
  }

  td.lesson {
    background-color: #a29595; /* lessons gray */
    color: #fff;
    font-weight: bold;
    border-radius: 6px;
  }

  tr:last-child td {
    border-bottom: none;
  }
</style>

<h1>Timetable</h1>

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
    {#each hours2 as hour}
      <tr>
        <td>{hour}</td>
        {#each days as day}
          <td class={lessons[day + "-" + hour] ? "lesson" : ""}>
            {lessons[day + "-" + hour] ?? ""}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>