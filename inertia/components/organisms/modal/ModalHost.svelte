<script lang="ts">
	import { onMount } from 'svelte';
	import { portal } from 'svelte-portal';
	let modalEl: HTMLElement;
	let innerEl: HTMLElement;

	export let open = false;
	const toggle = () => {
		open = !open;
	};

	onMount(() => {
		modalEl.addEventListener('click', (e) => {
			if (!innerEl.contains(e.target as Node)) {
				open = false;
			}
		});
	});
</script>

<slot name="trigger" {toggle}></slot>

<div
	bind:this={modalEl}
	use:portal={'body'}
	class="items-start modal-host {open
		? 'show'
		: ''} fixed top-0 h-full right-0 bottom-0 left-0 px-4 lg:px-6 py-4 lg:py-6"
>
	<div class="mx-auto w-full lg:w-auto h-auto" bind:this={innerEl}>
		<slot name="inner" {toggle}></slot>
	</div>
</div>

<style >
	.modal-host {
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(3px);
		z-index: 9999;
		display: none;
	}

	.modal-host.show {
		display: flex;
	}

</style>
