<script lang="ts">
	export let classList = '';
	export let node: HTMLElement | null = null;
</script>

<aside bind:this={node} class="{classList} post-right-sidebar bottom-0 top-16 flex flex-col justify-between border-l bg-white px-4 py-4 right-0 w-[250px] ">
	<ul>
		<li>
			<a class="text-gray-700 flex py-2 text-base" href="/post/requirements">Requirements</a>
		</li>
		<li>
			<a class="text-gray-700 flex py-2 text-base" href="/post/requirements">Project structure</a>
			<!-- Sub menu -->
			<ul class="border-l">
				<li>
					<a class="text-gray-700 flex pl-4 py-2 text-base" href="/post/requirements">
						Introduction
					</a>
				</li>
				<li>
					<a class="text-gray-700 flex pl-4 py-2 text-base" href="/post/requirements">
						Lorem ipsum
					</a>
				</li>
			</ul>
		</li>
		<li>
			<a class="text-gray-700 flex py-2 text-base" href="/post/requirements">Update</a>
		</li>
		<li>
			<a class="text-gray-700 flex py-2 text-base" href="/post/requirements">Build</a>
		</li>
	</ul>

	<div class="bg-gray-200 rounded-lg mx-4 h-[5.625rem] bottom-0 hidden lg:block"></div>
</aside>
