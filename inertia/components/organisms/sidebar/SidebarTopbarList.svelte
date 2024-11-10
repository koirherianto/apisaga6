<script lang="ts">
	// tidak bisa karna khusus untuk sveltekit
	// import { page } from '$app/stores';
	import SidebarMenuListing from '~/components/molecules/sidebarMenuListing/SidebarMenuListing.svelte';
	// import type { Menu } from '~/types/menu';
	// import type { Params } from '~/types/params';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
  	import type { Topbar } from '~/types/topbar'

	// $: parameters = $page.params as Params;

	let sortableEl: HTMLElement;
	export let isMobileNav: boolean = false;
	export let isSortable: boolean = true;
	export let canChangeParent: boolean = true;
	export let noParentEdit: boolean = false;

	// export let posts: Menu[] = [];
	// new
	export let topbars: Topbar[] = [];
	export let isSubmenu: boolean;
	export let selectableParent: HTMLElement | null = null;

	let isLoaded: boolean = false;

	let instance: Sortable;
	onMount(() => {
		if (!isSortable) return;

		let currentMoveRelatedEl: HTMLElement | null = null;
		let options: Sortable.Options = {};
		if (isSubmenu) {
			options = {
				onRemove: (e) => {
					const targetEl = e.target;
					const targetRect = targetEl.getBoundingClientRect();

					const containerEl = targetEl.parentElement;

					containerEl?.style.setProperty('--offset', `${targetRect.height}px`);
				},
				onAdd: (e) => {
					const targetEl = e.target;
					const targetRect = targetEl.getBoundingClientRect();
					const itemEl = e.item;
					const itemAnchorEl = itemEl.querySelector('a');
					const itemAnchorElContainPL = itemAnchorEl?.classList.contains('pl-6');
					if (!itemAnchorElContainPL) {
						itemAnchorEl?.classList.add('pl-6');
					}

					const containerEl = targetEl.parentElement;

					containerEl?.style.setProperty('--offset', `${targetRect.height}px`);
				}
			};
		}

		if (!isSubmenu) {
			options = {
				...options,
				onAdd: (e) => {
					// Handle if children of submenu is added to the root
					const item = e.item;
					const itemAnchor = item.querySelector('a');
					const itemAnchorContainPL = itemAnchor?.classList.contains('pl-6');

					if (itemAnchorContainPL) itemAnchor?.classList.remove('pl-6');
				}
			};
		}

		if (!isMobileNav) {
			options = {
				...options,
				group: 'nested'
			};
		}

		instance = Sortable.create(sortableEl, {
			animation: 150,
			onStart: (e) => {
				const item = e.item;
				item.classList.toggle('dragging');
			},
			onEnd: (e) => {
				const item = e.item;

				item.classList.remove('dragging');
				// const target = e.target;
				const listActiveWithBorder = document.querySelectorAll(
					'li.will-insert-after, li.will-insert-before'
				)[0];

				if (listActiveWithBorder) {
					listActiveWithBorder.classList.remove('will-insert-after');
					listActiveWithBorder.classList.remove('will-insert-before');
				}
			},
			onMove: (e) => {
				const willInsertAfter = e.willInsertAfter;
				const relatedEl = e.related as HTMLElement;

				// Remove class 'will-insert-after' and 'will-insert-before'
				// from the 'currentMoveRelatedEl'
				if (currentMoveRelatedEl) {
					currentMoveRelatedEl.classList.remove('will-insert-after');
					currentMoveRelatedEl.classList.remove('will-insert-before');
				}

				// Add class 'will-insert-after' and 'will-insert-before'
				// depending on the 'willInsertAfter'
				if (willInsertAfter) {
					relatedEl.classList.add('will-insert-after');
					relatedEl.classList.remove('will-insert-before');
				} else {
					relatedEl.classList.remove('will-insert-after');
					relatedEl.classList.add('will-insert-before');
				}

				// Set the 'currentMoveRelatedEl' to the 'relatedEl'
				currentMoveRelatedEl = relatedEl;
			},
			...options
		});

		isLoaded = true;
	});

	onDestroy(() => {
		instance?.destroy();
	});
</script>

<ul bind:this={sortableEl} class="menu-list sidebar-menu-left py-1 {isSubmenu ? 'border-l' : ''}">
	{#each topbars as topbar}
		<!-- <SidebarMenuListing
			{selectableParent}
			{isMobileNav}
			{canChangeParent}
			{noParentEdit}
			childrenOfSubMenu={isSubmenu}
			category={parameters.category}
			menu={post}
		/> -->
		
		<SidebarMenuListing
			{selectableParent}
			{isMobileNav}
			{canChangeParent}
			{noParentEdit}
			childrenOfSubMenu={isSubmenu}
			category='aaa'
			menu={topbar}
		/>
	{/each}
</ul>

{#if isLoaded}
	<style>
	.sidebar-menu-left .will-insert-after {
		position: relative;
	}

	.sidebar-menu-left .will-insert-after::after {
		content: '';
		position: absolute;
		height: 2px;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1050;
		border-radius: 2px;
		background-color: #d1d5db;
	}

	.sidebar-menu-left .will-insert-before {
		position: relative;
	}

	.sidebar-menu-left .will-insert-before::before {
		content: '';
		position: absolute;
		height: 2px;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1050;
		border-radius: 2px;
		background-color: #d1d5db;
	}

	</style>
{/if}
