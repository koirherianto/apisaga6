<script lang="ts">
	import PlusIcon from '~/components/atoms/icons/PlusIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const toggle = () => {
		dispatch('toggle');
	};
</script>

<button
	on:click={toggle}
	class="flex items-center text-nowrap justify-center gap-2 w-full py-4 text-emerald-600 hover:text-emerald-700 text-base font-medium"
>
	<PlusIcon />
	<span>Add a New Menu</span>
</button>

<style></style>
