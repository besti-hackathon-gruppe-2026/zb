<script>

	import { LogOut, Users, SquarePen, CalendarDays, House } from "@lucide/svelte";

</script>



<nav class="taskbar">
  <ul class="taskbar-list">
    <li><a href="home"><p>Home</p></a></li>
    <li><p>Stundenplan</p></li>
    <li><p>Filter</p></li>
    <li><p>Klassenzimmer</p></li>
  </ul>
  <div class="logout-icon"><LogOut/></div>
  
</nav>

<style>

.taskbar {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

.taskbar-list {
  display: flex;
  gap: 5rem;
  list-style-type: none;
  align-items: center;
  margin: 0;
  flex: 1;
}

.logout-icon {
  margin-left: auto; 
  flex-shrink: 0;
}

.taskbar-list li:hover p, .logout-icon:hover {
  color: grey;
  cursor: pointer;
}

 </style> 