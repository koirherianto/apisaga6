<script lang="ts">
	import toDiffableHtml from 'diffable-html';
	import he from 'he';
	import { marked } from 'marked';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';

	export let mdValue = '';
	let prettyHtml = '';
	let htmlDecoded = '';

	onMount(() => {
		const html = marked.parse(mdValue) as string;
		htmlDecoded = he.decode(html);

		codeToHtml(toDiffableHtml(htmlDecoded), {
			lang: 'html',
			theme: 'vitesse-light'
		}).then((html) => {
			prettyHtml = html;
		});
	});
</script>

<div class="px-6">{@html prettyHtml}</div>
