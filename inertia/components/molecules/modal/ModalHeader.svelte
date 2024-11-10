<script lang="ts">
	import XCircle from '~/components/atoms/icons/phospor/XCircle.svelte';
	import { createEventDispatcher } from 'svelte';
	export let title;
	const dispatch = createEventDispatcher();

	const toggle = () => dispatch('toggle');
</script>

<div class="px-4 py-4 flex items-center justify-between gap-2 border-b">
	<div class="text-xl">{title}</div>
	<button on:click={toggle}>
		<XCircle />
	</button>
</div>
