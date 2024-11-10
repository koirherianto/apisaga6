<script lang="ts">
	import ModalHeader from '~/components/molecules/modal/ModalHeader.svelte';

	import Button from '~/components/atoms/button/Button.svelte';
	import SelectInput from '~/components/atoms/form/SelectInput.svelte';
	import TextInput from '~/components/atoms/form/TextInput.svelte';
	import ModalHost from '../modal/ModalHost.svelte';

	let parents = [
		{ label: 'Installation', value: '1' },
		{ label: 'Getting Started', value: '2' },
		{ label: 'Guide', value: '3' }
	];

	export let title = 'Add a New Menu';
	export let noParentEdit: boolean = false;
</script>

<ModalHost>
	<svelte:fragment slot="trigger" let:toggle>
		<slot name="trigger" {toggle} />
	</svelte:fragment>

	<svelte:fragment slot="inner" let:toggle>
		<div class="bg-white rounded-lg overflow-hidden lg:w-[447px] mx-auto">
			<ModalHeader on:toggle={toggle} {title} />
			<div class="py-6 px-6">
				{#if !noParentEdit}
					<SelectInput classList="mb-4" placeholder="Parent Menu" options={parents} />
				{/if}
				<TextInput classList="mb-4" label="Name" placeholder="Enter the page name" />
				<TextInput classList="" label="Slug" placeholder="Enter the page slug" />
				<Button on:click={toggle} classList="mt-4" size="large">Save Changes</Button>
			</div>
		</div>
	</svelte:fragment>
</ModalHost>
