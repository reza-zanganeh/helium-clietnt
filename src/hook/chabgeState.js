/** @format */

import { ref } from "vue";
export default function(active, childClassEl, activeClassEl) {
  const lastActive = ref(null);
  const parentEl = ref(null);
  function changeActive(event) {
    if (!lastActive.value) {
      lastActive.value = parentEl.value.children[active - 1];
    }
    const target = event.target.closest(`.${childClassEl}`);
    if (!target) return;
    lastActive.value.classList.remove(activeClassEl);
    target.classList.add(activeClassEl);
    lastActive.value = target;
  }

  return {
    parentEl,
    changeActive,
  };
}
