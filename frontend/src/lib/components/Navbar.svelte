<script lang="ts">
	import { LogOut } from '@lucide/svelte';

	import { page } from '$app/state';

	const pageId = $derived(page.url.pathname.split('/')[2]);
</script>

<nav>
	<div></div>
	<ul class="navbar-elements">
		<a href="/app/home" style="font-weight: {pageId === 'home' ? 'bold' : 'normal'};"> Home </a>
		<a href="/app/filter" style="font-weight: {pageId === 'filter' ? 'bold' : 'normal'};">
			Filter
		</a>
		<a href="/app/classrooms" style="font-weight: {pageId === 'classroom' ? 'bold' : 'normal'};">
			Classrooms
		</a>
		<a href="/app/agenda" style="font-weight: {pageId === 'classroom' ? 'bold' : 'normal'};">
			Agenda
		</a>
	</ul>
	<div class="logout-icon"><LogOut /></div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;

		width: 100%;
		border: 1px solid #ddd;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a:hover {
		opacity: 0.6;
	}

	.navbar-elements {
		display: flex;
		justify-content: space-around;

		max-width: 28rem;
		width: 100%;
		text-decoration: none;
		list-style: none;
	}
</style>
