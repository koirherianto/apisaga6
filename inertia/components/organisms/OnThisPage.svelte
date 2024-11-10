<script lang="ts">
	import AngleDownIcon from '~/components/atoms/icons/AngleDownIcon.svelte';
	import { onMount } from 'svelte';
	import RightSidebar from './sidebar/RightSidebar.svelte';

	let open = false;
	let menuEl: HTMLElement;
	let isLoaded = false;

	onMount(() => {
		const wrapper = menuEl.parentElement;
		const menuRect = menuEl.getBoundingClientRect();
		wrapper?.style.setProperty('--offset', `${menuRect.height}px`);

		isLoaded = true;
	});

	const toggle = () => {
		open = !open;
	};
</script>

<div class="border border-b-2 rounded-lg flex flex-col on-this-page {open ? 'show' : ''}">
	<button on:click={toggle} class=" px-4 py-3 flex w-full items-center gap-2 justify-between">
		<span>On this page</span>
		<AngleDownIcon classList="!size-5 anggle-icon" />
	</button>

	<div class="px-4 overflow-hidden menu-wrapper {open ? 'show' : ''}">
		<RightSidebar bind:node={menuEl} classList="border-l-0 px-0 py-0 pt-1 pb-2 h-auto menu" />
	</div>
</div>

{#if isLoaded}
	<style >
		.on-this-page {
		}

		@media screen and (min-width: 1024px) {
			.on-this-page {
				display: none;
			}
		}

		.on-this-page .anggle-icon {
			transition: transform var(--margin-transition-duration) var(--margin-timing-function);
		}

		.on-this-page.show .anggle-icon {
			transform: rotate(-90deg);
		}

		.on-this-page .menu-wrapper {
			height: 0;
			transition: height var(--margin-transition-duration) var(--margin-timing-function);
		}

		.on-this-page .menu-wrapper .menu {
			transform: translateY(-12px);
			transition: transform var(--margin-transition-duration) var(--margin-timing-function);
		}

		.on-this-page .menu-wrapper.show {
			height: var(--offset);
		}

		.on-this-page .menu-wrapper.show .menu {
			transform: translateY(0);
		}

	</style>
{/if}
