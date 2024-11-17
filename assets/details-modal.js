/* ESTO ES UN 'CUSTOM ELEMENT', es una de las principales caracteristicas de los 'Componentes Web/Web Components' es la de crear 'Custom
Elements'.

Custom Elements: Son elementos HTML cuyo comportamiento es definido por los Desarrolladores Web, que extiende el conjunto de elementos 
disponibles en el navegador (p, h1, a, etc)

HAY DOS(2) TIPOS DE CUSTOM ELEMENTS:

I) Customized built-in elements inherit from standard HTML elements such as 'HTMLImageElement', 'HTMParagraphElement', etc. Sus implementaciones
  extienden el comportamiento de las instancias seleccionadas del elemento standard.

II) Autonomous custom elements inherit from the HTML element base class 'HTMLElement', a diferencia del 'I' acá nosotros IMPLEMENTAMOS SUS
    COMPORTAMIENTOS DESDE CERO.
*/

/* DetailsModal es un 'Autonomous custom element' (II) En este caso el 'Custom Element' es implementado como una 'class' que extiende(extends)
   'HTMLElement'
*/
class DetailsModal extends HTMLElement {
//El la clase 'constructor' podemos definir el ESTADO INICIAL y los valores por defecto, registrar eventListeners,etc.
  constructor() {
    super();
    this.detailsContainer = this.querySelector('details');
    this.summaryToggle = this.querySelector('summary');

    this.detailsContainer.addEventListener('keyup', (event) => event.code.toUpperCase() === 'ESCAPE' && this.close());
    this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));
    this.querySelector('button[type="button"]').addEventListener('click', this.close.bind(this));

    this.summaryToggle.setAttribute('role', 'button');
  }

  isOpen() {
    return this.detailsContainer.hasAttribute('open');
  }

  onSummaryClick(event) {
    event.preventDefault();
    event.target.closest('details').hasAttribute('open') ? this.close() : this.open(event);
  }

  onBodyClick(event) {
    if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) this.close(false);
  }

  open(event) {
    this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
    event.target.closest('details').setAttribute('open', true);
    document.body.addEventListener('click', this.onBodyClickEvent);
    document.body.classList.add('overflow-hidden');

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])')
    );
  }

  close(focusToggle = true) {
    removeTrapFocus(focusToggle ? this.summaryToggle : null);
    this.detailsContainer.removeAttribute('open');
    document.body.removeEventListener('click', this.onBodyClickEvent);
    document.body.classList.remove('overflow-hidden');
  }
}

//Para hacer disponible un 'Custom element' en la página tenemos que llamar a 'define()' con 'customElements' - REGISTRAR EL CUSTOM ELEMENT
customElements.define('details-modal', DetailsModal);

// Una vez definido y registrado el 'Custom Element' lo podemos usar en nuestro código así en este caso: <details-modal></details-modal>