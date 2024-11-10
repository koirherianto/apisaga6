<script lang="ts">
	import SearchInput from '~/components/atoms/form/SearchInput.svelte';
	import SearchListing from '~/components/molecules/search/SearchListing.svelte';
	import SearchNotFound from '~/components/molecules/search/SearchNotFound.svelte';

	let contentEl: HTMLElement;
	let notFoundEl: HTMLElement;

	const handleSearch = (e: CustomEvent<string>) => {
		const value = e.detail;

		if (value !== '' && value !== '-') {
			// do search
			contentEl.classList.remove('hidden');
		} else {
			contentEl.classList.add('hidden');
		}

		if (value === '-') {
			notFoundEl.classList.remove('hidden');
		} else {
			notFoundEl.classList.add('hidden');
		}
	};
</script>

<div class="flex flex-col">
	<SearchInput on:search={handleSearch} />

	<div class="result hidden" bind:this={contentEl}>
		<SearchListing />
	</div>

	<div class="mt-4 hidden" bind:this={notFoundEl}>
		<SearchNotFound />
	</div>
</div>
