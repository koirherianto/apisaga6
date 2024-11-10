<svelte:head>
  <title>Homepage2</title>
</svelte:head>

<script lang="ts">

	// lapis 1 +layout.server.ts paling luar
  // new data
  import { topbarsData, versionsData, languagesData, pagesData } from '~/main_data';

  let data = {
    topbars: topbarsData,
    versions: versionsData,
    languages: languagesData,
    pages: pagesData
  }

	//   lapis 2  +layout.svelte paling luar
  import Footer from '~/components/organisms/footer/Footer.svelte';
  import Header from '~/components/organisms/header/Header.svelte'
  import MenuSidebar from '~/components/organisms/sidebar/MenuSidebar.svelte'
  import Sidebar from '~/components/organisms/sidebar/Sidebar.svelte'

  import { onMount } from 'svelte'
  // new
  import { topbarStore } from '~/stores/topbar';
  import { versionStore } from '~/stores/version';
  import { languagesStore } from '~/stores/language';
  import { postStore } from '~/stores/post_data';

  let sidebarOpen: boolean = false
  let mobileNavOpen: boolean = false
  let hasbeenUpdateSidebarStatus: boolean = false

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen
    hasbeenUpdateSidebarStatus = true
  }

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen
  }

  // new
  topbarStore.set(data.topbars)
  versionStore.set(data.versions)
  languagesStore.set(data.languages)
  postStore.set(data.pages);

  onMount(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      sidebarOpen = true
    }
  })

</script>

<Sidebar {sidebarOpen} on:toggle={toggleSidebar} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={sidebarOpen ? toggleSidebar : toggleMobileNav}
	class="backdrop {sidebarOpen || mobileNavOpen ? 'show' : ''} z-40"
></div>

<Header {sidebarOpen} on:toggleMobileNav={toggleMobileNav} on:toggle={toggleSidebar} />

<main
	class="main-content-wrapper mt-16"
	style="--sidebar-width: {sidebarOpen ? '22.125rem' : '4.5rem'}"
>
	<slot></slot>
</main>


<MenuSidebar on:toggle={toggleMobileNav} sidebarOpen={mobileNavOpen} />

<Footer />

<style>

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
    transition: background-color var(--margin-transition-duration) var(--margin-timing-function);

    &.show {
      pointer-events: all;
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* Middle */
    @media screen and (min-width: 768px) {
    }

    /* Large */
    @media screen and (min-width: 1024px) {
      background-color: transparent;
      pointer-events: none;

      &.show {
        pointer-events: none;
        background-color: transparent;
      }
    }

    /* XLarge */
    @media screen and (min-width: 1280px) {
    }

    /* XXLarge */
    @media screen and (min-width: 1536px) {
    }
  }

  main.main-content-wrapper {
    transition: margin-left var(--margin-transition-duration) var(--margin-timing-function);
    margin-left: 0rem;

    /* Middle */
    @media screen and (min-width: 768px) {
    }

    /* Large */
    @media screen and (min-width: 1024px) {
      margin-left: var(--sidebar-width);
    }

    /* XLarge */
    @media screen and (min-width: 1280px) {
    }

    /* XXLarge */
    @media screen and (min-width: 1536px) {
    }
  }
</style>

