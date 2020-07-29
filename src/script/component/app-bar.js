class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        $(this).html(`<nav class="navbar navbar-dark bg-primary">
        <h1 class="navbar-brand">Al-Quran</h1>
      </nav>`);
    }
}


customElements.define("app-bar", AppBar);