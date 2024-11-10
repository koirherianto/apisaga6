<script lang="ts">
	export let placeholder = '';
	export let label = '';
	export let classList = '';

	let id = Math.random().toString();
	let h = 'h-14';
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label for={id} class="text-sm">{label}</label>
	{/if}

	<input
		{id}
		{placeholder}
		type="text"
		class="border border-gray-300 bg-white rounded-lg outline-none {h} px-4 py-2 text-base focus:ring-1 focus:ring-blue-500 focus:border-blue-500 {classList}"
	/>
</div>
