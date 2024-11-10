<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let isOpen = false;
	let dropdownElement: HTMLElement | null = null;

	const handleOutsideClick = (event: MouseEvent) => {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isOpen = false;
		}
	};

	const toggleDropdown = () => {
		isOpen = !isOpen;
		dispatch('toggle', { isOpen, dropdownElement });
	};

	onMount(() => {
		document.addEventListener('click', handleOutsideClick);
	});
</script>

<div class="dropdown-wrapper" bind:this={dropdownElement}>
	<!-- Slotfor trigger button -->
	<slot name="trigger" {toggleDropdown}></slot>

	<!-- Slot for trigger button content -->
	<div class="{isOpen ? 'show' : ''} flex dropdown-menu absolute flex-col right-0 bg-white z-50 rounded-lg px-2 py-4 min-w-[150px]">
		<slot name="menu"></slot>
	</div>
</div>

<style>
	.dropdown-menu {
		box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.2);
		transform: translateY(15px);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.dropdown-menu.show {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(5px);
	}
</style>
