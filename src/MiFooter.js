class MiFooter extends HTMLElement {
    connectedCallback() {
        const texto = this.getAttribute('texto') || 'Footer WebComponent';
        this.innerHTML = `
      <footer style="margin-top: 20px; padding: 10px; background: #eee;">
        <p>${texto}</p>
      </footer>
    `;
    }
}
customElements.define('mi-footer', MiFooter);