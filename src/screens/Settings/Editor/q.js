import grapesJSMJML from 'grapesjs-mjml';
import grapesCUSTOMCODE from 'grapesjs-custom-code'
import { createAvatar } from '@dicebear/avatars';
import { icons } from '@dicebear/collection';
import { openModal } from './modal';


export const my_comp = (grapesJS, plagins, input_templates=null)=>{
    const editor_comp = {
        editor: null,
        current_template: null,
        input_templates: input_templates,
        templates: [],
        avatar: function (seed){
          return createAvatar(icons, { seed }).toString();
        },
        init: function () {
          console.log(this.input_templates)
          if (!this.input_templates || this.input_templates.length === 0) {
            throw new Error('не были загружены шаблоны');
        }
          this.editor = grapesJS.init({
            // fromElement: true,
            // dragMode: 'translate',
            container: '#gjs',
            plugins: [grapesJSMJML, grapesCUSTOMCODE],
            pluginsOpts: {
              "grapesJSMJML": {}
            },
            showTemplateFlag: false,
            storageManager: false,
          });
      
      
      
          (this.editor.Components).addType('my-input-type', {
            model: {
              defaults: {
                tagName: 'mj-text',
                draggable: true,
                droppable: true,
                templateVal: 'value1', // Начальное значение текста
                attributes: {
                  type: 'text',
                },
                components: (model) => model.get('templateVal'),
                toHTML: function () {
                  // Генерируем HTML для экспорта
                  return `<mj-text type="${this.get('attributes').type}">
                    ${this.get('templateVal')}
                  </mj-text>`;
                },
              },
            },
            view: {
              onRender({ el, model }) {
                // Отображение компонента на канвасе
                const content = model.get('templateVal') || '';
                el.innerHTML = `<div 
                    contenteditable="true" 
                    style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                    ${content}
                  </div>`;
          
                // Обработчик изменений текста
                el.addEventListener('input', (e) => {
                  model.set('templateVal', e.target.innerText); // Сохраняем изменения текста в модели
                });
              },
            }
          });
      
          const panelManager = this.editor.Panels;
          panelManager.addButton('devices-c', {
            id: 'myNewButton',
            className: 'someClass',
            command: (editor) => {
              const ModalContainer = openModal(this.input_templates, (selectedItem) => {
                this.current_template = selectedItem;
                this.showTemplateFlag = true
              }, this.current_template);
      
              editor.Modal.open({
                title: 'выбор шаблона',
                content: ModalContainer,
              });
            },
            attributes: { title: 'Some title' },
            label: "шаблоны",
            active: false,
            togglable: false
          });
      
          this.editor.on('modal:close', () => {
            if(this.showTemplateFlag){
              this.editor?.Blocks.getBlocksByCategory().forEach((data) => {
                if (data.category?.id !== 'jinja-templates') return;
                data.items?.forEach((block) => {
                  this.editor?.Blocks.remove(block.id);
                });
              });
        
              this.add_blocks(this.current_template);
              this.import_template(this.current_template.mjml_template);
              this.showTemplateFlag = false

              //получить корневой компонент
              const wrapper = this.editor.DomComponents.getComponents()
              //получить блок футтера
              if (this.current_template.mjml_template.includes('Данное письмо было сформировано')) {
                return
              } 
              //добавить футер
              try{
                const futter_block = this.editor.BlockManager.get('futter').attributes.content
                wrapper.models[0].attributes.components.models[0].attributes.components.add(futter_block)
              }
              catch(error){
                console.log('template exist')
              }
            }
            
          });
          return this.editor
        },
      
        add_blocks: function (block_info) {
          block_info.content.forEach((new_block, index) => {
            const label = `${block_info.label}-${index}`;
            this.editor?.Blocks.add(`${block_info.label}-${index}`, {
              id: block_info.id + `-${index}`,
              label: new_block.name,
              media: this.avatar(label),
              category: 'jinja-templates',
              content: {
                type: 'my-input-type',
                templateVal: new_block.content
              }
            });
          });
          this.editor?.Blocks.add('futter',{
            id: 'futter',
            label: 'futter',
            media: this.avatar('futter'),
            category: 'base',
            content: {
              type: 'my-input-type',
              templateVal: 'Данное письмо было сформировано автоматически сервисом ReycleStarter.',
            }
          })
        },
      
        validate_export: function (exporting_html) {
          if (!this.current_template) {
            throw new Error('при экспорте не был выбран ни один шаблон');
          }
          this.current_template.content.forEach((jinja_block) => {
            if (!exporting_html.includes(jinja_block.content)) {
              throw new Error(`Ошибка: отсутствует обязательная подстрока в блоке"${jinja_block.name}"`);
            }
          });
        },
      
        export_row_html_template: function () {
          const command= this.editor?.Commands.get('mjml-code-to-html');
        
          if (!command) {
            throw new Error('Команда mjml-code-to-html не найдена.');
          }
        
          const html_string = command.run().html ?? '';
          this.validate_export(html_string);
          return html_string;
        },
        export_mjml_template: function () {
          const command = this.editor?.Commands.get('mjml-code');
      
          if (!command){
              throw new Error('Команда mjml-code не найдена.');
          }
          const mjml_string = command.run() ?? ''
          this.validate_export(mjml_string);
          return mjml_string;
        },
      
        import_template: function (mjml_structure){
          const command = this.editor?.Commands.get('mjml-import');
          if (!command){
              throw new Error('Команда mjml-import не найдена.');
          }
          command.onImport(mjml_structure)
        }
      };
  return editor_comp
}
// editor_comp.init();
// (window as any).editor_comp = editor_comp;
// (window as any).my_editor = editor_comp.editor;