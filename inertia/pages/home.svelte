<script lang="ts">
    import EditorLayout from "~/layouts/EditorLayout.svelte"
  
    // +page.server.ts
    import type { ReadPost } from '~/types/post';
  
    const data: ReadPost = {
          category: 'categorry',
          parent: 'Getting Started',
          title: 'Installation',
          slug: 'installation',
          content: 'Hello World'
      };
  
    // +page.svelte editor
  
    import Editor from '~/components/organisms/editor/Editor.svelte';
    
  </script>
  
  <EditorLayout>
    <div class="px-4">
      <!-- Editor -->
      <div class="bg-white mt-6">
        <Editor />
      </div>
      <!-- End of Editor -->
    </div>
  </EditorLayout>