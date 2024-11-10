<script lang="ts">
	import AngleRight from '~/components/atoms/icons/AngleRight.svelte';
	import ListIcon from '~/components/atoms/icons/ListIcon.svelte';
  	import type { Post } from '~/types/post'

	export let hasSubmenu = false;
	export let menu: Post;
</script>

<li class="w-full">
	<a
		class="rounded-xl hover:bg-gray-50 group cursor-pointer px-4 py-2.5 flex items-center text-base relative justify-between {hasSubmenu
			? 'font-medium text-black'
			: 'text-gray-800'}"
		href={menu.href}
	>
		<ListIcon classList="!size-4 absolute opacity-0 group-hover:opacity-100 transition-all -left-5 group-hover:left-5"/>

		<span class="text group-hover:ml-10 transition-all">{menu.title}</span>

		{#if hasSubmenu}
			<span class="icon"><AngleRight classList="!size-5 fill-current" /></span>
		{/if}
	</a>
</li>
