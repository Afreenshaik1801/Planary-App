
// =========================
// ✅ Packing
// =========================

    // Your checklistCategories data from user input (imported or copied here)
    let checklistCategories = [
      {
        id: 'essentials',
        name: 'Essentials',
        emoji: '🔑',
        items: [
          { id: 'e1', text: 'Passport/ID', checked: false },
          { id: 'e2', text: "Driver's License", checked: false },
          { id: 'e3', text: 'Travel Insurance', checked: false },
          { id: 'e4', text: 'Credit/Debit Cards', checked: false },
          { id: 'e5', text: 'Cash (INR)', checked: false },
          { id: 'e6', text: 'Travel Tickets', checked: false },
          { id: 'e7', text: 'Hotel Reservation', checked: false },
          { id: 'e8', text: 'Emergency Contacts', checked: false },
          { id: 'e9', text: 'Copies of Documents', checked: false },
          { id: 'e10', text: 'Health Insurance Card', checked: false },
        ],
      },
      {
        id: 'clothes',
        name: 'Clothing',
        emoji: '👕',
        items: [
          { id: 'c1', text: 'T-shirts/Tops', checked: false },
          { id: 'c2', text: 'Pants/Shorts/Skirts', checked: false },
          { id: 'c3', text: 'Underwear', checked: false },
          { id: 'c4', text: 'Socks', checked: false },
          { id: 'c5', text: 'Sleepwear', checked: false },
          { id: 'c6', text: 'Sweater/Jacket', checked: false },
          { id: 'c7', text: 'Swimwear', checked: false },
          { id: 'c8', text: 'Formal Outfit', checked: false },
          { id: 'c9', text: 'Rain Jacket/Poncho', checked: false },
          { id: 'c10', text: 'Comfortable Walking Shoes', checked: false },
          { id: 'c11', text: 'Flip-flops/Sandals', checked: false },
          { id: 'c12', text: 'Hat/Cap', checked: false },
          { id: 'c13', text: 'Sunglasses', checked: false },
        ],
      },
      {
        id: 'toiletries',
        name: 'Toiletries',
        emoji: '🧼',
        items: [
          { id: 't1', text: 'Toothbrush & Toothpaste', checked: false },
          { id: 't2', text: 'Shampoo & Conditioner', checked: false },
          { id: 't3', text: 'Soap/Body Wash', checked: false },
          { id: 't4', text: 'Deodorant', checked: false },
          { id: 't5', text: 'Sunscreen', checked: false },
          { id: 't6', text: 'Insect Repellent', checked: false },
          { id: 't7', text: 'Moisturizer', checked: false },
          { id: 't8', text: 'Razor & Shaving Cream', checked: false },
          { id: 't9', text: 'Hair Brush/Comb', checked: false },
          { id: 't10', text: 'Makeup & Remover', checked: false },
          { id: 't11', text: 'Feminine Hygiene Products', checked: false },
          { id: 't12', text: 'Contact Lenses & Solution', checked: false },
          { id: 't13', text: 'First Aid Kit', checked: false },
        ],
      },
      {
        id: 'tech',
        name: 'Tech & Gadgets',
        emoji: '📱',
        items: [
          { id: 'g1', text: 'Smartphone & Charger', checked: false },
          { id: 'g2', text: 'Camera & Charger', checked: false },
          { id: 'g3', text: 'Power Bank', checked: false },
          { id: 'g4', text: 'Universal Travel Adapter', checked: false },
          { id: 'g5', text: 'Headphones', checked: false },
          { id: 'g6', text: 'E-reader/Tablet', checked: false },
          { id: 'g7', text: 'SD Cards/Storage', checked: false },
          { id: 'g8', text: 'Laptop & Charger', checked: false },
          { id: 'g9', text: 'Portable WiFi Device', checked: false },
          { id: 'g10', text: 'Tripod/Selfie Stick', checked: false },
          { id: 'g11', text: 'Bluetooth Speaker', checked: false },
        ],
      },
      {
        id: 'health',
        name: 'Health & Medicine',
        emoji: '💊',
        items: [
          { id: 'h1', text: 'Prescription Medications', checked: false },
          { id: 'h2', text: 'Pain Relievers', checked: false },
          { id: 'h3', text: 'Band-Aids', checked: false },
          { id: 'h4', text: 'Antiseptic Wipes', checked: false },
          { id: 'h5', text: 'Insect Bite Relief', checked: false },
          { id: 'h6', text: 'Diarrhea Medication', checked: false },
          { id: 'h7', text: 'Motion Sickness Pills', checked: false },
          { id: 'h8', text: 'Allergy Medication', checked: false },
          { id: 'h9', text: 'Thermometer', checked: false },
          { id: 'h10', text: 'Hand Sanitizer', checked: false },
          { id: 'h11', text: 'Face Masks', checked: false },
        ],
      },
      {
        id: 'misc',
        name: 'Miscellaneous',
        emoji: '🎒',
        items: [
          { id: 'm1', text: 'Daypack/Small Bag', checked: false },
          { id: 'm2', text: 'Water Bottle', checked: false },
          { id: 'm3', text: 'Travel Pillow', checked: false },
          { id: 'm4', text: 'Eye Mask & Earplugs', checked: false },
          { id: 'm5', text: 'Books/Magazines', checked: false },
          { id: 'm6', text: 'Travel Games/Cards', checked: false },
          { id: 'm7', text: 'Umbrella', checked: false },
          { id: 'm8', text: 'Snacks', checked: false },
          { id: 'm9', text: 'Reusable Shopping Bag', checked: false },
          { id: 'm10', text: 'Luggage Tags', checked: false },
          { id: 'm11', text: 'Luggage Lock', checked: false },
          { id: 'm12', text: 'Travel Guide/Maps', checked: false },
          { id: 'm13', text: 'Notebook & Pen', checked: false },
        ],
      },
    ];

    // Main app script
    (() => {
      // Elements
      const categoryListEl = document.querySelector('.categories');
      const itemListEl = document.querySelector('.item-list');
      const categoryEmojiEl = document.querySelector('.category-emoji');
      const categoryNameEl = document.querySelector('.category-name');
      const addInputEl = document.querySelector('.add-item input');
      const addButtonEl = document.querySelector('.add-item button');
      const counterEl = document.querySelector('.counter');
      const resetBtn = document.querySelector('.reset-btn');
      const toggleThemeBtn = document.getElementById('toggle-theme');
      const body = document.body;

      let activeCategoryId = checklistCategories[0].id;

      // Save/load checked states to localStorage
      const STORAGE_KEY = 'packingChecklistState';

      function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistCategories));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const savedCategories = JSON.parse(saved);
      if (Array.isArray(savedCategories)) {
        checklistCategories = savedCategories;
      }
    } catch {
      // Ignore errors
    }
  }
}

      // Render category sidebar
      function renderCategories() {
        categoryListEl.innerHTML = '';
        checklistCategories.forEach(cat => {
          const li = document.createElement('li');
          li.textContent = `${cat.emoji} ${cat.name}`;

          // Add count badge
          const total = cat.items.length;
          const packed = cat.items.filter(i => i.checked).length;
          const spanCount = document.createElement('span');
          spanCount.className = 'counter';
          spanCount.textContent = `${packed}/${total}`;
          li.appendChild(spanCount);

          if (cat.id === activeCategoryId) {
            li.classList.add('active');
          }

          li.setAttribute('tabindex', 0);
          li.setAttribute('role', 'button');
          li.setAttribute('aria-pressed', cat.id === activeCategoryId);
          li.addEventListener('click', () => {
            setActiveCategory(cat.id);
          });
          li.addEventListener('keypress', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveCategory(cat.id);
            }
          });

          categoryListEl.appendChild(li);
        });
      }

      // Render items for active category
      function renderItems() {
        const category = checklistCategories.find(c => c.id === activeCategoryId);
        if (!category) return;

        categoryEmojiEl.textContent = category.emoji;
        categoryNameEl.textContent = category.name;

        itemListEl.innerHTML = '';

        category.items.forEach(item => {
          const li = document.createElement('li');

          const label = document.createElement('label');
          label.setAttribute('for', item.id);
          label.textContent = item.text;
          label.className = item.checked ? 'checked' : '';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = item.id;
          checkbox.checked = item.checked;
          checkbox.addEventListener('change', () => {
            item.checked = checkbox.checked;
            label.classList.toggle('checked', checkbox.checked);
            saveState();
            renderCategories();
            renderCounter();
          });

          const deleteBtn = document.createElement('i');
          deleteBtn.className = 'fas fa-trash delete-icon';
          deleteBtn.title = 'Delete item';
          deleteBtn.setAttribute('role', 'button');
          deleteBtn.setAttribute('tabindex', 0);
          deleteBtn.addEventListener('click', () => {
            deleteItem(item.id);
          });
          deleteBtn.addEventListener('keypress', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              deleteItem(item.id);
            }
          });

          // Clear label text content and append checkbox + text node to control order
          label.textContent = '';
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(item.text));

          li.appendChild(label);
          li.appendChild(deleteBtn);

          itemListEl.appendChild(li);
        });
      }

      // Set active category and rerender
      function setActiveCategory(id) {
        activeCategoryId = id;
        renderCategories();
        renderItems();
        renderCounter();
        addInputEl.value = '';
        addButtonEl.disabled = true;
        addInputEl.focus();
      }

      // Add new item
      function addItem(text) {
        if (!text.trim()) return;

        const category = checklistCategories.find(c => c.id === activeCategoryId);
        if (!category) return;

        // Generate unique id for new item
        const newId = generateUniqueId(category.items);

        category.items.push({
          id: newId,
          text: text.trim(),
          checked: false,
        });

        saveState();
        renderItems();
        renderCategories();
        renderCounter();
      }

      // Delete item by id
      function deleteItem(id) {
        const category = checklistCategories.find(c => c.id === activeCategoryId);
        if (!category) return;

        const idx = category.items.findIndex(i => i.id === id);
        if (idx > -1) {
          category.items.splice(idx, 1);
          saveState();
          renderItems();
          renderCategories();
          renderCounter();
        }
      }

      // Reset all checked items in all categories
      function resetAll() {
        checklistCategories.forEach(cat => {
          cat.items.forEach(item => (item.checked = false));
        });
        saveState();
        renderItems();
        renderCategories();
        renderCounter();
      }

      // Generate unique id for new item inside a category
      function generateUniqueId(items) {
        const baseId = 'new';
        let counter = 1;
        while (items.some(i => i.id === baseId + counter)) {
          counter++;
        }
        return baseId + counter;
      }

      // Render counter footer (overall packed/total)
      function renderCounter() {
        let totalItems = 0;
        let totalPacked = 0;
        checklistCategories.forEach(cat => {
          totalItems += cat.items.length;
          totalPacked += cat.items.filter(i => i.checked).length;
        });
        counterEl.textContent = `${totalPacked}/${totalItems} items packed`;
      }

      // Handle add input enable/disable
      addInputEl.addEventListener('input', () => {
        addButtonEl.disabled = addInputEl.value.trim() === '';
      });

      // Handle add button click
      addButtonEl.addEventListener('click', () => {
        addItem(addInputEl.value);
        addInputEl.value = '';
        addButtonEl.disabled = true;
        addInputEl.focus();
      });

      // Handle reset button
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all checked items?')) {
          resetAll();
        }
      });

      // Theme toggle: save preference in localStorage
      function setTheme(dark) {
  if (dark) {
    body.classList.add('dark-mode');
    toggleThemeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    toggleThemeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme === 'dark');
}


      // Initialize app
      function init() {
        loadState();
        loadTheme();
        renderCategories();
        setActiveCategory(activeCategoryId);
        renderCounter();
      }

      init();
    })();

