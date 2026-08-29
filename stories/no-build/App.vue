<!--
  The host application, written the way any author would write it — and served
  to the browser as exactly this text. Nothing compiled it on the way: the page
  fetches this file and vue3-sfc-loader turns it into a component in the tab.

  Note what the imports are: bare specifiers. They resolve through the import
  map in `index.html`, so the code here is identical to the code you would
  write against a bundler.
-->
<script setup>
import { ref } from 'vue'
import { DataShell, createMockDataSource } from 'header-content-layout'
import { schemas } from 'header-content-layout/fixtures'
import OpenedRow from './OpenedRow.vue'

const params = new URLSearchParams(location.search)

const schema = schemas[params.get('schema')] ?? schemas.iRadar
const theme = params.get('theme') ?? 'minimal'
const source = createMockDataSource({ seed: schema.key })

/** Host state, so the page is an application rather than a screenshot. */
const opened = ref(null)
</script>

<template>
  <!--
    No `route` prop, so the shell binds itself to this page's own address bar.
    Change the entity or the view and the URL follows — with `schema` and the
    story's other parameters left where they are.
  -->
  <DataShell
    :schema="schema"
    :source="source"
    :theme="theme"
    pinnable
    @activate="opened = $event"
  >
    <template #actions>
      <OpenedRow :row="opened" />
    </template>
  </DataShell>
</template>
