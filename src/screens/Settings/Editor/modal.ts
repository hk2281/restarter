interface JinjaBlock {
    name: string,
    content: string
  }

interface MyDataItem {
    id: string;
    label: string;
    description: string;
    content: JinjaBlock[];
    media: string;
    mjml_template: string;
  }
  
  type OnSelectCallback = (item: MyDataItem) => void;
  
  export const openModal = (
    my_data: MyDataItem[], 
    onSelectCallback?: OnSelectCallback, 
    currentObject: MyDataItem | null = null
  ): HTMLDivElement => {
    console.log('openModal');
  
    // Создаем элемент select для выпадающего списка
    const selectElement = document.createElement('select');
    selectElement.id = 'my-dropdown';
    selectElement.style.width = '100%';  // Пример стилей
  
    // Добавляем плейсхолдер, если currentObject не передан
    if (!currentObject) {
      const placeholderOption = document.createElement('option');
      placeholderOption.textContent = 'Выберите один элемент списка';
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      selectElement.appendChild(placeholderOption);
    }
  
    // Заполняем select данными из массива my_data
    my_data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;  // Значение для value
      option.textContent = item.label;  // Текст для отображения
      option.setAttribute('data-description', item.description); // Добавляем описание как атрибут
  
      // Если текущий объект передан, устанавливаем выбранный элемент
      if (currentObject && currentObject.id === item.id) {
        option.selected = true;
      }
  
      selectElement.appendChild(option);
    });
  
    // Создаем блок для отображения выбранного контента
    const contentPreview = document.createElement('div');
    contentPreview.id = 'content-preview';
    contentPreview.style.marginTop = '20px';
    contentPreview.innerHTML = currentObject 
      ? currentObject.content.map(block => block.name + ': ' + block.content).join('<br>')
      : '<p>блоки: -</p>';  // Изначально сообщение
  
    // Создаем блок для отображения описания
    const descriptionPreview = document.createElement('div');
    descriptionPreview.id = 'description-preview';
    descriptionPreview.style.marginTop = '10px';
    descriptionPreview.style.fontSize = '12px';
    descriptionPreview.style.color = '#666'; // Цвет для описания
    descriptionPreview.innerHTML = currentObject
      ? currentObject.description
      : '<p>Описание: -</p>'; // Изначально сообщение
  
    // Обрабатываем выбор в dropdown
    selectElement.addEventListener('change', (event) => {
      const selectedId = (event.target as HTMLSelectElement).value;
      const selectedItem = my_data.find(item => item.id === selectedId);
      if (selectedItem) {
        // Обновляем блок с выбранным контентом
        contentPreview.innerHTML = selectedItem.content.map(block => block.name + ': ' + block.content).join('<br>');
        
        // Обновляем блок с описанием
        descriptionPreview.innerHTML = selectedItem.description;
  
        // Пример: можно вставить контент в редактор
        // editor.setComponents(selectedItem.content);
  
        if (onSelectCallback) {
          onSelectCallback(selectedItem);
        }
      }
    });
  
    // Создаем контейнер для компонента
    const container = document.createElement('div');
    container.appendChild(selectElement);  // Добавляем dropdown
    container.appendChild(descriptionPreview);  // Добавляем блок для отображения описания
    container.appendChild(contentPreview);  // Добавляем блок для отображения контента
  
    return container;
  }