<script lang="ts">
	import SearchIcon from '~/components/atoms/icons/custom/SearchIcon.svelte';
	import ModalHost from '../modal/ModalHost.svelte';
	import Search from '../search/Search.svelte';

	// let parents = [
	// 	{ label: 'Installation x', value: '1' },
	// 	{ label: 'Getting Started x', value: '2' },
	// 	{ label: 'Guide x', value: '3' }
	// ];
</script>

<ModalHost>
	<svelte:fragment slot="trigger" let:toggle>
		<button class="flex" on:click={toggle}>
			<SearchIcon classList="!size-5" />
		</button>
	</svelte:fragment>

	<svelte:fragment slot="inner" >
		<div class="bg-white rounded-lg overflow-hidden lg:w-[447px] mx-auto p-4">
			<Search />
		</div>
	</svelte:fragment>
</ModalHost>
