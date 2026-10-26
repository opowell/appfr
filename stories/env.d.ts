/**
 * A stylesheet imported as its text (`?inline`), which Vite answers with a
 * string rather than with a `<style>` in the page — see `content.ts`.
 */
declare module '*.css?inline' {
  const css: string
  export default css
}
