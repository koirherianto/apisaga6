<script lang="ts">
	import DocumentIcon from '~/components/atoms/icons/custom/DocumentIcon.svelte';
	import MagicStarIcon from '~/components/atoms/icons/custom/MagicStarIcon.svelte';
	import EyeIcon from '~/components/atoms/icons/phospor/EyeIcon.svelte';
</script>

<div class="flex items-center gap-4">
	<div class="flex items-center gap-[2.5px] flex-nowrap text-nowrap">
		<EyeIcon classList="!size-5 fill-gray-600" />
		<span class="text-sm text-gray-600">1k Watching</span>
	</div>
	<div class="flex items-center gap-[2.5px] flex-nowrap text-nowrap">
		<MagicStarIcon classList="!size-5 text-gray-600" />
		<span class="text-sm text-gray-600">77.9 stars</span>
	</div>
	<div class="flex items-center gap-[2.5px] flex-nowrap text-nowrap">
		<DocumentIcon classList="!size-5 text-gray-600" />
		<span class="text-sm text-gray-600">MIT License</span>
	</div>
</div>
