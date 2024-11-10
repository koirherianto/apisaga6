<script lang="ts">
	import Button from '~/components/atoms/button/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import ModalHost from '../modal/ModalHost.svelte';
	export let text = '';
	export let subText = '';
	const dispatch = createEventDispatcher();
</script>

<ModalHost>
	<svelte:fragment slot="trigger" let:toggle>
		<slot name="trigger" {toggle}></slot>
	</svelte:fragment>

	<svelte:fragment slot="inner" let:toggle>
		<div class="bg-white rounded-lg overflow-hidden lg:w-[447px] mx-auto">
			<div class="py-6 px-4">
				<h3 class="text-xl mb-1">{text}</h3>
				<p class="text-gray-400 mb-2">
					{subText}
				</p>

				<div class="flex gap-2">
					<Button
						on:click={() => {
							dispatch('confirm', toggle);
						}}
						variant="secondary"
						classList="mt-4">Delete</Button
					>
					<Button classList="mt-4" on:click={toggle}>Cancel</Button>
				</div>
			</div>
		</div>
	</svelte:fragment>
</ModalHost>
