<script lang="ts">
	import PlusIcon from '~/components/atoms/icons/PlusIcon.svelte';
	import HeaderLeftMenuListing from '~/components/molecules/header/HeaderLeftMenuListing.svelte';
	import AddNewPageModal from '~/components/organisms/modals/AddNewPageModal.svelte';
	import Sortable from 'sortablejs';
	import { onDestroy, onMount } from 'svelte';
	// new
  	import type { Topbar } from '~/types/topbar'

	// new
	export let topbars: Topbar[] = [];

	const prefix = '/post'; // Prefix for links

	let sortableEl: HTMLElement;
	let sortable: Sortable;
	let isLoaded: boolean = false;

	onMount(() => {
		let currentMoveRelatedEl: HTMLElement | null = null;
		sortable = Sortable.create(sortableEl, {
			animation: 150,
			onStart: (e) => {
				const item = e.item;
				item.classList.add('dragging');
			},
			onEnd: (e) => {
				const item = e.item;
				item.classList.remove('dragging');
				const target = e.target;
				const listActiveWithBorder = target.querySelectorAll(
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
			}
		});

		isLoaded = true;
	});

	onDestroy(() => {
		sortable?.destroy();
	});
</script>

<ul class="flex items-center h-full header-left-menu" bind:this={sortableEl}>
	{#each topbars as topbar (topbar.title)}
		<HeaderLeftMenuListing {topbar} {prefix} />
	{/each}

	<!-- Extend the left menu -->

	<!-- {#if $isEditorActive} -->
		<AddNewPageModal>
			<svelte:fragment slot="trigger" let:toggle>
				<button on:click={toggle}>
					<PlusIcon classList="text-green-600" />
				</button>
			</svelte:fragment>
		</AddNewPageModal>
	<!-- {/if} -->
</ul>

{#if isLoaded}
	<style>
		.header-left-menu .will-insert-after {
			position: relative;
		}

		.header-left-menu .will-insert-after::after {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
			width: 2px;
			height: 40%;
			border-radius: 2px;
			background-color: #d1d5db;
			z-index: 1050;
		}

		.header-left-menu .will-insert-before {
			position: relative;
		}

		.header-left-menu .will-insert-before::before {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 0;
			width: 2px;
			height: 40%;
			border-radius: 2px;
			background-color: #d1d5db;
			z-index: 1050;
		}

		.header-left-menu .dragging-icon {
			left: 0;
			opacity: 0;
			transition: 
				left var(--base-transision-duration) var(--base-transitionn-timing-function), 
				opacity var(--base-transision-duration) var(--base-transitionn-timing-function);
		}

		.header-left-menu li .item {
			transition: 
				padding-left var(--base-transision-duration) var(--base-transitionn-timing-function);
		}

		.header-left-menu li.dragging .dragging-icon {
			opacity: 1;
			left: 1rem;
		}

		.header-left-menu li.dragging .item {
			padding-left: calc(1rem + 24px);
		}

	</style>
{/if}
