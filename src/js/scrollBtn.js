function showBtn() {
  window.onscroll = () => {
    if (window.scrollY > 700) {
      refs.scrollBtn.classList.remove('is-show_off');
    } else if (window.scrollY < 700) {
      refs.scrollBtn.classList.add('is-show_off');
    }
  };
}
export { showBtn };
