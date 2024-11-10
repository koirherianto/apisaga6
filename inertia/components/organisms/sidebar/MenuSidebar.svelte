<script lang="ts">
	import XMarkFilled from '~/components/atoms/icons/custom/XMarkFilled.svelte';
	import GithubIcon from '~/components/atoms/icons/GithubIcon.svelte';
	import SunIcon from '~/components/atoms/icons/SunIcon.svelte';

	import { createEventDispatcher, onDestroy } from 'svelte';

	import type { Topbar } from '~/types/topbar'
	import type { Version } from '~/types/version'
	import type { Language } from '~/types/language'
	
	import { topbarStore } from '~/stores/topbar'
	import { versionStore } from '~/stores/version'
	import { languagesStore } from '~/stores/language'

	import projectImage from '~/lib/images/go-sidebar-banner.png';

	import SidebarTopbarList from './SidebarTopbarList.svelte'
	import SidebarMenuList from './SidebarMenuList.svelte'

	export let sidebarOpen: boolean;

	const dispatch = createEventDispatcher();

	const toggle = () => {
		dispatch('toggle');
	};

	let menus3: Version[] | Language[] = [
		{
		id: 0,
		title: 'Version',
		slug: undefined,
		submenu: []
	},{
		id:1,
		title: 'Language',
		slug: undefined,
		submenu: []
	}];

	let topbars: Topbar[] = [];

	const unsubscribeTopbar = topbarStore.subscribe((data) => {
		topbars = data;
	});
	const unsubscribeVersion = versionStore.subscribe((data) => {
		menus3[0].submenu = data;
	});
	const unsubscribeLanguage = languagesStore.subscribe((data) => {
		menus3[1].submenu = data;
	});
	
	onDestroy(() => {
		unsubscribeTopbar();
		unsubscribeVersion();
		unsubscribeLanguage();
	});

</script>

<aside id="menu-sidebar" class="{sidebarOpen ? 'show' : ''} bg-white border-l">
	<div class="flex items-center h-16 px-4 justify-between">
		<span class="font-bold text-black">APISAGA</span>

		<div class="flex items-center gap-2">
			<button>
				<SunIcon />
			</button>
			<a href="https://github.com/umardev500">
				<GithubIcon />
			</a>
			<button on:click={toggle}>
				<XMarkFilled />
			</button>
		</div>
	</div>

	<!-- Content -->
	<div class="bottom-[4.5rem] pb-4 absolute top-1 right-0 left-0" data-simplebar>
		<!-- Banner -->
		<!-- <enhanced:img
			class="mx-auto px-6 mt-6 banner w-full"
			src={projectImage}
			alt="banner"
		/> -->
		<img src={projectImage} class="mx-auto px-6 mt-2 banner w-full" alt="logo banner"/>
		<!-- End of Banner -->

		<div class="px-4 py-2 text-nowrap menus min-h-full h-auto">
			<SidebarTopbarList noParentEdit isMobileNav={true} isSubmenu={false} topbars={topbars} />
			<!-- rightbar version & language -->
			<SidebarMenuList
				canChangeParent={false}
				isSortable={false}
				isMobileNav={true}
				isSubmenu={false}
				posts={menus3}
			/>
		</div>
	</div>
	<!-- End of Content -->
</aside>

<style >
	.menus {
		max-height: 100vh; /* atau set tinggi maksimum tertentu, misal 400px */
		overflow-y: auto;  /* menambahkan scrollbar secara vertikal jika konten lebih tinggi */
		overflow-x: hidden; /* menghindari scroll horizontal jika tidak diperlukan */
	}
	#menu-sidebar {
		position: fixed;
		font-family: 'Roboto';
		right: calc(-1 * var(--menu-sidebar-width));
		top: 0;
		bottom: 0;
		z-index: 1050;
		width: var(--menu-sidebar-width);
		transition: right var(--margin-transition-duration) var(--margin-timing-function);
	}

	@media screen and (min-width: 1024px) {
		#menu-sidebar {
			right: calc(-1 * var(--menu-sidebar-width));
		}
	}

	#menu-sidebar.show {
		right: 0;
	}

	@media screen and (min-width: 1024px) {
		#menu-sidebar.show {
			right: calc(-1 * var(--menu-sidebar-width));
		}
	}

</style>
