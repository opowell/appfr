import { ref } from 'vue'

/**
 * Which rows a story has ticked. Module-level so the cell component and
 * anything else on the page are looking at one selection — and so the ticks
 * survive sorting, paging and a change of view, being the host's state rather
 * than the table's.
 */
export const selectedRows = ref<string[]>([])
