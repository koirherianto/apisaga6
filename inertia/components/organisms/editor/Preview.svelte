<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github.css';
	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import { onMount } from 'svelte';

	export let mdValue = '';
	let isLoaded: boolean = false;

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, _) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	const html = marked.parse(mdValue);

	onMount(() => {
		isLoaded = true;
	});
</script>

<div class="markdown-content py-4">
	<div class="px-6">{@html html}</div>
</div>

{#if isLoaded}
	<style>
		.markdown-content h1,
		.markdown-content h2,
		.markdown-content h3,
		.markdown-content h4,
		.markdown-content h5,
		.markdown-content h6,
		.markdown-content p,
		.markdown-content ul > li {
			color: #1F2937; /* text-gray-800 */
		}

		.markdown-content h1 {
			font-size: 2.5rem; /* 40px */
			margin-bottom: 1rem;
			margin-top: 1rem;
		}

		.markdown-content h2 {
			font-size: 2rem; /* 32px */
			margin-bottom: 1rem;
			margin-top: 1rem;
		}

		.markdown-content h3 {
			font-size: 1.75rem; /* 28px */
			margin-bottom: 0.5rem;
			margin-top: 0.5rem;
		}

		.markdown-content h4 {
			font-size: 1.5rem; /* 24px */
			margin-bottom: 0.5rem;
			margin-top: 0.5rem;
		}

		.markdown-content h5 {
			font-size: 1.25rem; /* 20px */
			margin-bottom: 0.5rem;
			margin-top: 0.5rem;
		}

		.markdown-content h6 {
			font-size: 1rem; /* 16px */
			margin-bottom: 0.5rem;
			margin-top: 0.5rem;
		}

		.markdown-content p {
			line-height: 1.75;
		}

		.markdown-content a {
			font-weight: 500; /* font-medium */
			text-decoration: underline;
			color: #0369A1; /* text-sky-700 */
		}

		.markdown-content ul {
			list-style-type: disc;
			margin-left: 1.5rem;
		}

		.markdown-content ul li {
			margin-bottom: 0.5rem;
			padding-left: 0.5rem;
		}

		.markdown-content code {
			font-family: 'Fira Code', monospace;
		}

		.markdown-content code:not([class]) {
			font-family: 'Ubuntu Mono', monospace;
			font-weight: 500; /* font-medium */
			background-color: #F3F4F6; /* bg-gray-100 */
			padding: 0.25rem 0.5rem; /* px-2 py-1 */
			border-radius: 0.5rem; /* rounded-lg */
			margin: 0 0.25rem; /* mx-1 */
			color: #1F2937; /* text-gray-800 */
		}

	</style>
{/if}
