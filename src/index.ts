import { customElement, html, LitElement, css } from 'lit-element';
import { editor } from 'monaco-editor';

@customElement('sql-editor')
class SqlEditor extends LitElement {
  // @property({ type: Number })
  static get styles() {
    return css`
      :host {
        display: flex;
        flex: 1;
        height: 100%;
      }
      .editor-container {
        flex: 1;
      }
    `;
  }

  render() {
    return html`
      <div id="sql-editor-container" class="editor-container" style="flex: 1;"></div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    editor.create((<any>this).querySelector('#sql-editor-container'),{
      value: 'SELECT * FROM Table',
      language: 'sql'
    });

    console.log(editor);

    debugger;
  }
}
