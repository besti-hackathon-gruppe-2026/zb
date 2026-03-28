<script lang="ts">
	import { LogOut } from '@lucide/svelte';

	import { page } from '$app/state';

	const pageId = $derived(page.url.pathname.split('/')[2]);
</script>

<nav>
	<div></div>
	<ul class="navbar-elements">
		<li>
			<a href="/app/home" class:active={pageId === 'home'}> Home </a>
		</li>
		<li>
			<a href="/app/filter" class:active={pageId === 'filter'}> Filter </a>
		</li>
		<li>
			<a href="/app/classrooms" class:active={pageId === 'classrooms'}> Classrooms </a>
		</li>
		<li>
			<a href="/app/agenda" class:active={pageId === 'agenda'}> Agenda </a>
		</li>
	</ul>
	<form method="POST" action="/auth/logout">
		<button class="logout">
			<LogOut />
		</button>
	</form>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;

		width: 100%;
		border-bottom: 1px solid #ddd;

		position: sticky;
		top: 0;
		background: white;
		z-index: 10;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a:hover {
		opacity: 0.6;
	}

	a.active {
		font-weight: bold;
		opacity: 1;
	}

	a.active:hover {
		opacity: 1;
	}

	.navbar-elements {
		display: flex;
		justify-content: space-around;

		max-width: 28rem;
		width: 100%;
		text-decoration: none;
		list-style: none;
	}

	.logout {
		background-color: white;
		color: black;
		cursor: pointer;
	}
</style>
