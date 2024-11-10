<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SearchIcon from '~/components/atoms/icons/custom/SearchIcon.svelte';
	
	const dispatch = createEventDispatcher();

	const onSearch = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => dispatch('search', (e.target as HTMLInputElement)?.value);
</script>

<div class="flex items-center gap-2 border border-b-2 px-4 rounded-lg">
	<SearchIcon classList="!size-5 text-gray-500" />

	<input
		on:keyup={onSearch}
		type="text"
		placeholder="Search something..."
		class="outline-none font-normal w-full py-2 h-14"
	/>
</div>
