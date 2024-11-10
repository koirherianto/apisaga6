<script lang="ts">
	import SidebarAddNewMenu from '~/components/atoms/button/SidebarAddNewMenu.svelte';
	import ArrowLeft from '~/components/atoms/icons/ArrowLeft.svelte';
	import GithubIcon from '~/components/atoms/icons/GithubIcon.svelte';
	import ListIcon from '~/components/atoms/icons/ListIcon.svelte';
	import SunIcon from '~/components/atoms/icons/SunIcon.svelte';
	import AddNewMenuModal from '~/components/organisms/modals/AddNewMenuModal.svelte';
	import SidebarMenuList from '~/components/organisms/sidebar/SidebarMenuList.svelte';
	import 'simplebar';
	import 'simplebar/dist/simplebar.min.css';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { postStore } from '~/stores/post_data';
  	import type { Post } from '~/types/post'

	// import projectImage from '~/lib/images/go-sidebar-banner.png';

	const dispatch = createEventDispatcher();

	export let sidebarOpen: boolean;
	const toggle = () => {
		dispatch('toggle');
	};

	let posts: Post[] = [];
	const unsubscribe = postStore.subscribe((data) => {
		posts = data;
	});

	onDestroy(() => {
		unsubscribe();
	});

	// @Todo
	// Fetch Menus data from server
</script>

<aside class="sidebar {sidebarOpen ? 'show' : ''} bottom-0 top-0 left-0 pb-6 border-r bg-white z-50">
	<div class="flex items-center border-b h-16 px-4 heading relative">
		<!-- Top Desktop -->
		<div class="lg:flex items-center gap-2 text-nowrap text w-full sidebar-top-desktop hidden">
			<span class="text-gray-900">
				<ArrowLeft classList="fill-current" />
			</span>
			<span class="font-bold text-black">APISAGAD</span>
		</div>

		<button on:click={toggle} class="hover:text-gray-800 absolute right-4 toggler hidden lg:inline-flex">
			<ListIcon classList="!size-5 fill-current" />
		</button>
		<!-- End of Top Desktop -->

		<div class="h-full px-2 flex items-center justify-between mobile-menu lg:hidden w-full">
			<div class="flex items-center gap-2">
				<button>
					<ArrowLeft />
				</button>

				<span class="font-bold text-base">APISAGA leftbar</span>
			</div>

			<div class="flex items-center gap-2">
				<button>
					<SunIcon />
				</button>
				<a href="https://github.com/umardev500">
					<GithubIcon />
				</a>
				<button on:click={toggle}>
					<ListIcon />
				</button>
			</div>
		</div>
	</div>
	<!-- Content -->
	<div class="pb-0 absolute h-full top-0 right-0 left-0" data-simplebar>
		<!-- Banner -->
		<!-- <enhanced:img
			class="mx-auto px-6 mt-6 banner w-full"
			src={projectImage}
			alt="banner"
		/> -->
		<!-- <img src={projectImage} class="mx-auto px-6 mt-6 banner w-full" alt="logo banner"/> -->
		<!-- End of Banner -->
	
		<div class="px-4 py-6 text-nowrap menus min-h-full h-auto">
			<SidebarMenuList isSubmenu={false} {posts} />
		</div>
	</div>
	<div class="border-t absolute h-[4.5rem] bg-white bottom-0 right-0 left-0 flex add-menu-button" id="tambah_menu">
		<AddNewMenuModal>
			<svelte:fragment slot="trigger" let:toggle>
				<SidebarAddNewMenu on:toggle={toggle} />
			</svelte:fragment>
		</AddNewMenuModal>
	</div>
	
	<!-- End of Content -->
</aside>

<style>
	.scrollable-menu {
		max-height: 300px; /* Atur tinggi maksimum sesuai kebutuhan */
		overflow-y: auto; /* Aktifkan scroll vertikal */
	}
	aside {
		position: fixed;
		font-family: 'Roboto';
	}

	.sidebar.show {
		width: 22.125rem;
	}

	.sidebar {
		width: 4.5rem;
		left: -22.125rem;
		transition: 
			left var(--margin-transition-duration) var(--margin-timing-function), 
			width var(--margin-transition-duration) var(--margin-timing-function);
	}

	@media screen and (min-width: 1024px) {
		.sidebar {
			left: 0;
		}
	}

	.sidebar .banner {
		opacity: 0;
		transition: opacity var(--margin-transition-duration) var(--margin-timing-function);
		height: 71px;
		object-fit: cover;
	}

	.sidebar .heading {
		justify-content: center;
	}

	.sidebar .heading .text {
		opacity: 0;
		pointer-events: none;
		transform: translateX(-30px);
		transition: 
			opacity var(--margin-transition-duration) var(--margin-timing-function), 
			transform var(--margin-transition-duration) var(--margin-timing-function);
	}

	.sidebar .heading .toggler {
		right: 50%;
		transform: translateX(50%);
		transition: 
			right var(--margin-transition-duration) var(--margin-timing-function), 
			transform var(--margin-transition-duration) var(--margin-timing-function);
	}

	.sidebar .menus {
		opacity: 0;
		transform: translateX(-30px);
		transition: 
			opacity var(--margin-transition-duration) var(--margin-timing-function), 
			transform var(--margin-transition-duration) var(--margin-timing-function);
	}

	.sidebar .add-menu-button {
		opacity: 0;
		transform: translateX(-30px);
		transition: 
			opacity var(--margin-transition-duration) var(--margin-timing-function), 
			transform var(--margin-transition-duration) var(--margin-timing-function);
	}

	.sidebar.show {
		left: 0rem;
	}

	.sidebar.show .banner {
		opacity: 1;
	}

	.sidebar.show .menus {
		opacity: 1;
		transform: translateX(0);
	}

	.sidebar.show .heading {
		justify-content: space-between;
	}

	.sidebar.show .heading .text {
		opacity: 1;
		pointer-events: unset;
		transform: translateX(0);
	}

	.sidebar.show .heading .toggler {
		right: 1.25rem;
	}

	.sidebar.show .add-menu-button {
		opacity: 1;
		transform: translateX(0);
	}

</style>
