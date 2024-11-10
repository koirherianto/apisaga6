<script lang="ts">
	import type { ReadPost } from '~/types/post';

	export let data: ReadPost;
</script>

<ol class="flex items-start gap-2.5 text-gray-600">
	<li>
		<a href="/post/{data.category}" class="text-nowrap">{data.parent}</a>
	</li>
	<li>/</li>
	<li>
		<a class="text-black font-medium text-nowrap" href="/post/{data.category}/{data.slug}">
			{data.title}
		</a>
	</li>
</ol>
