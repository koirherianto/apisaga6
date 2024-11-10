<script lang="ts">
	// tidak bisa karna svetlekit belum support
	// import { page } from '$app/stores';
	import AngleRight from '~/components/atoms/icons/AngleRight.svelte';
	import DeleteIcon from '~/components/atoms/icons/DeleteIcon.svelte';
	import ListIcon from '~/components/atoms/icons/ListIcon.svelte';
	import PenIcon from '~/components/atoms/icons/PenIcon.svelte';
	import AddNewMenuModal from '~/components/organisms/modals/AddNewMenuModal.svelte';
	import DeleteConfirm from '~/components/organisms/modals/DeleteConfirm.svelte';
	import SidebarMenuList from '~/components/organisms/sidebar/SidebarMenuList.svelte';
	import type { Menu } from '~/types/menu';
	import { onMount } from 'svelte';
  import type { Post } from '~/types/post'

	export let menu: Menu | Post;
	export let category: string;
	export let childrenOfSubMenu: boolean;
	export let isMobileNav: boolean = false;
	export let canChangeParent: boolean = true;
	export let noParentEdit: boolean = false;

	let isCategoryMatched: boolean = false;

	if (isMobileNav) {
		isCategoryMatched = category == menu.slug;
	}

	// Elements
	let submenuContainerEl: HTMLElement;

	// Local states
	let loaded: boolean;
	let isOpen: boolean;

	const notSubmenu = menu.slug || !menu.submenu;
	export let selectableParent: HTMLElement | null = null;

	const handleClick = (e: Event) => {
		if (selectableParent) {
			e.preventDefault();
			const itemTextEl = selectableParent
				.querySelector('a.item')
				?.querySelector('span') as HTMLElement;
			itemTextEl.innerText = menu.title;

			return;
		}

		if (notSubmenu) {
			return;
		}

		// Prevent navigation if its is the trigger for the submenu
		e.preventDefault();

		// Toggle state
		submenuContainerEl.classList.toggle('show');
		isOpen = !isOpen;
	};

	// Initialize default submenu height
	onMount(() => {
		if (notSubmenu) {
			return;
		}

		const submenuEl = submenuContainerEl.children[0];
		const submenuElRect = submenuEl.getBoundingClientRect();

		submenuContainerEl.style.setProperty('--offset', `${submenuElRect.height}px`);
		loaded = true;
	});

	let thisElement: HTMLElement | null = null;
	const selectable = menu.selectable;

	let classes: string[] = [];
	if (isMobileNav) {
		if (isCategoryMatched) {
			classes.push('text-gray-800');
			classes.push('font-medium');
		} else {
			if (notSubmenu && !childrenOfSubMenu) classes.push('text-gray-400');
			if (!notSubmenu) classes.push('text-gray-800');
			console.log(childrenOfSubMenu);
		}
	} else {
		classes.push('text-gray-800');

		if (childrenOfSubMenu) {
			classes.push('pl-6');
		} else {
			classes.push('font-medium');
		}
	}

	const confirmDeleting = (e: CustomEvent<() => void>) => {
		console.log('do deleting');
		e.detail(); // toggle modal
	};

	let isActive = false;
	$: if (!childrenOfSubMenu && !isMobileNav) {
		// const parameters = $page.params;
		// const slug = parameters.slug;
		if (menu.submenu !== undefined) {
			// isActive = menu.submenu.some((sub) => sub.slug === slug);
		}
	}

</script>

<li class="sortable-item relative {childrenOfSubMenu ? 'group' : ''}" bind:this={thisElement}>
	<div class="relative {childrenOfSubMenu ? '' : canChangeParent ? 'parent-hoverable': ''}">
		<a
			class="{classes.join(
				' '
			)} item py-2.5 flex z-10 relative text-base rounded-lg px-4 hover:bg-gray-50 items-center justify-between {isActive
				? 'bg-gray-50'
				: ''}"
			on:click={handleClick}
			href="/post/{category}/{menu.slug}"
		>
			<ListIcon classList="!size-4 absolute opacity-0 dragging-icon" />

			<span>{menu.title}</span>

			{#if menu.submenu}
				<AngleRight classList="!size-5 angle {isOpen ? 'show' : ''}" />
			{/if}
		</a>
		<!-- Hover action -->
		<div
			class="absolute z-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto h-full flex items-center gap-2 px-2 right-0 actions"
		>
			<AddNewMenuModal {noParentEdit} title="Edit menu">
				<svelte:fragment slot="trigger" let:toggle>
					<button on:click={toggle}>
						<PenIcon classList="!size-5 fill-gray-900" />
					</button>
				</svelte:fragment>
			</AddNewMenuModal>
			<DeleteConfirm
				text="Are you sure you want to delete this page?"
				subText="This action cannot be undone."
				on:confirm={confirmDeleting}
			>
				<svelte:fragment slot="trigger" let:toggle>
					<button on:click={toggle}>
						<DeleteIcon classList="!size-5 fill-red-500" />
					</button>
				</svelte:fragment>
			</DeleteConfirm>
		</div>
	</div>

	{#if menu.submenu}
		<div class="submenu-container" bind:this={submenuContainerEl}>
			<SidebarMenuList
				selectableParent={selectable ? thisElement : null}
				isSubmenu={true}
				{isMobileNav}
				posts={menu.submenu}
			/>
		</div>
	{/if}
</li>
{#if loaded}
	<style>
		.parent-hoverable:hover > .actions {
			opacity: 1;
			pointer-events: auto;
		}
		.parent-hoverable:hover > a > .angle {
			display: none;
		}

		.submenu-container {
			overflow: hidden;
			height: 0px;
			transform: translateY(-10px);
			transition:
				transform var(--base-transision-duration) var(--base-transitionn-timing-function),
				height var(--base-transision-duration) var(--base-transitionn-timing-function);
		}
		.submenu-container.show {
			height: var(--offset);
			transform: translateY(0);
		}

		.angle {
			transition: transform var(--base-transision-duration) var(--base-transitionn-timing-function);
		}

		.angle.show {
			transform: rotate(90deg);
		}

		.sortable-item {
			.item {
				transition: padding-left var(--base-transision-duration)
					var(--base-transitionn-timing-function);
			}

			.actions {
				top: 50%;
				transform: translateY(-50%);
			}

			.dragging-icon {
				left: 0;
				opacity: 0;
				transition:
					left var(--base-transision-duration) var(--base-transitionn-timing-function),
					opacity var(--base-transision-duration) var(--base-transitionn-timing-function);
			}

			&.dragging {
				.dragging-icon {
					opacity: 1;
					left: 1rem;
				}

				.item {
					padding-left: calc(1rem + 24px);
				}
			}
		}
	</style>
{/if}
