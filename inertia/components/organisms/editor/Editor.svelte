<script lang="ts">
	// import { attachment } from '@cartamd/plugin-attachment';
	// import { code } from '@cartamd/plugin-code';
	// import { emoji } from '@cartamd/plugin-emoji';
	// import { slash } from '@cartamd/plugin-slash';
	// import { Carta, MarkdownEditor } from 'carta-md';
	import { onMount } from 'svelte';

	// import '~/lib/styles/github.css';
	import Button from '~/components/atoms/button/Button.svelte';
	import HtmlView from '~/components/organisms/editor/HtmlView.svelte';
	import Preview from '~/components/organisms/editor/Preview.svelte';
	import Tab from '~/components/organisms/tab/Tab.svelte';

	// const carta = new Carta({
	// 	sanitizer: false,
	// 	theme: 'everforest-light',
	// 	extensions: [
	// 		attachment({
	// 			async upload() {
	// 				return 'some-url-from-server.xyz';
	// 			}
	// 		}),
	// 		emoji(),
	// 		slash(),
	// 		code()
	// 	]
	// });

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/css/editor.css'; // Path relatif dari direktori public
		document.head.appendChild(link);

		return () => {
		// Bersihkan saat komponen di-unmount
		document.head.removeChild(link);
		};
	});

	export let value = `
### Calculator App
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


\`\`\`go
package main // Package declaration

func add(a, b) {
	return a + b; // Add two numbers
}
\`\`\`
### Installation

- Install golang compiler [Golang](https://golang.org/)
- Clone the repository \`git clone https://github.com/carta-dev/carta.git\`
- Run \`make\`

### Social Links

- [Github](https://github.com/umardev500)
- [Facebook](https://facebook.com/umardev500)
`;

const tabs = [
	{ name: 'Editor', active: true },
	{ name: 'HTML', active: false },
	{ name: 'Preview', active: false }
];

</script>

<div class="border md-editor-container rounded-2xl overflow-hidden mt-[5.5rem]">
	<Tab tabs={tabs}>
		<svelte:fragment slot="tab" let:tabs let:toggle let:activeTab>
			<div class="flex items-center py-4 px-4 justify-between border-b flex-wrap gap-4">
				<div class="flex tab items-center">
					{#each tabs as tab, i}
						<button
							on:click={() => toggle(i)}
							class="{activeTab === i ? 'active' : ''} text-nowrap text-gray-500">{tab.name}</button
						>
					{/each}
				</div>
				<div class="flex items-center gap-2 w-full lg:w-auto">
					<Button variant="secondary">Cancel</Button>
					<Button>Save Changes</Button>
				</div>
			</div>
		</svelte:fragment>

		<svelte:fragment slot="content" let:activeTab>
			{#if activeTab === 0}
				<!-- <MarkdownEditor bind:value mode="tabs" theme="github" {carta} /> -->
				<HtmlView mdValue={value} />
			{/if}

			{#if activeTab === 1}
				<HtmlView mdValue={value} />
			{/if}

			{#if activeTab === 2}
				<Preview mdValue={value} />
			{/if}
		</svelte:fragment>
	</Tab>
</div>

<style>
	.tab > button {
		@apply px-4 py-1 rounded-xl border border-white;
	}
	.tab .active {
		@apply font-medium;
		@apply border-gray-300;
		@apply bg-white;
		@apply text-gray-800;
	}

	/* ----------------------- style editor ------------------ */

	.md-editor-container:focus-within {
		outline: 1px solid #fee2e2; /* Equivalent of outline-red-100 */
	}

	.carta-theme__github {
		/* Core styles */
		--background: #0d1117;
		--background-light: #161b22;
		--border: #2b3138;
		--accent: #1f6feb;
	}

	.carta-theme__github.carta-editor {
		background-color: white;
	}

	.carta-theme__github .carta-wrapper {
		padding: 1rem;
		flex-grow: 1;
	}

	.carta-theme__github .carta-input,
	.carta-theme__github .carta-renderer {
		min-height: 320px;
		max-height: 460px;
		overflow: auto;
	}

	.carta-theme__github .carta-font-code {
		font-family: 'Fira Code', monospace;
		caret-color: #0f172a; /* Equivalent of caret-slate-800 */
		font-size: 1rem;
	}

	.carta-theme__github .carta-toolbar {
		height: 3rem;
		background-color: white;
		border-bottom: 1px solid;
		border-radius: 0;
		justify-content: flex-start;
	}

	.carta-theme__github .carta-toolbar .carta-icon {
		width: 2rem;
		height: 2rem;
		color: #1f2937; /* Equivalent of text-gray-800 */
	}

	.carta-theme__github .carta-toolbar .carta-icon:hover {
		background-color: #f3f4f6; /* Equivalent of bg-gray-100 */
	}

	.carta-theme__github .carta-toolbar-left,
	.carta-theme__github .carta-filler {
		display: none;
	}

	.carta-theme__github .carta-toolbar-left > *:first-child {
		border-top-left-radius: 0.5rem;
	}

	.carta-theme__github .carta-toolbar-left > * {
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 0.95rem;
	}

	.carta-theme__github .carta-toolbar-left button {
		height: 100%;
		color: #9ca3af; /* Equivalent of text-gray-400 */
	}

	.carta-theme__github .carta-active {
		background-color: var(--background);
		color: white;
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--background);
	}

	.carta-theme__github .carta-active:not(:first-child) {
		border-left: 1px solid var(--border);
	}

	.carta-theme__github .carta-toolbar-right {
		padding-right: 12px;
		padding-left: 3px;
	}

	.carta-theme__github .carta-icons-menu {
		padding: 8px;
		border: 1px solid var(--border);
		border-radius: 6px;
		min-width: 180px;
		background-color: var(--background);
	}

	.carta-theme__github .carta-icon-full {
		padding-left: 6px;
		padding-right: 6px;
		margin-top: 2px;
	}

	.carta-theme__github .carta-icon-full:first-child {
		margin-top: 0;
	}

	.carta-theme__github .carta-icon-full:hover {
		color: white;
		background-color: var(--border);
	}

	.carta-theme__github .carta-icon-full span {
		margin-left: 6px;
		color: white;
		font-size: 0.85rem;
	}

	/* Plugin emoji */
	.carta-emoji {
		width: 18rem;
		max-height: 14rem;
		overflow-y: scroll;
		border-radius: 4px;
		font-family: inherit;
		background-color: var(--background);
		padding: 6px;
		scroll-padding: 6px;
		gap: 6px;
	}

	.carta-emoji button {
		background-color: var(--background-light);
		aspect-ratio: 1;
		border-radius: 4px;
		border: 0;
		padding: 0;
		margin: 0.175rem;
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 100%;
	}

	.carta-emoji button:hover,
	.carta-emoji button.carta-active {
		background-color: var(--border);
	}

	/* Plugin slash */
	.carta-slash {
		width: 18rem;
		max-height: 14rem;
		overflow-y: scroll;
		border-radius: 4px;
		font-family: inherit;
		background-color: var(--background);
		padding: 6px;
		scroll-padding: 6px;
	}

	.carta-slash span {
		width: fit-content;
	}

	.carta-slash button {
		background: none;
		width: 100%;
		padding: 10px;
		border: 0;
		border-radius: 4px;
	}

	.carta-slash .carta-slash-group {
		padding: 0 4px;
		margin-bottom: 4px;
		font-size: 0.8rem;
	}

	.carta-slash button.carta-active,
	.carta-slash button:hover {
		background-color: var(--background-light);
		cursor: pointer;
	}

	.carta-slash .carta-snippet-title {
		font-size: 0.85rem;
		font-weight: 600;
	}

	.carta-slash .carta-snippet-description {
		font-size: 0.8rem;
		text-overflow: ellipsis;
	}

html.dark .shiki,
html.dark .shiki span {
    color: var(--shiki-dark) !important;
}

</style>
