
    document.addEventListener('DOMContentLoaded', () => {
      const localStorageKey = 'tripPlannerData';
      let state = JSON.parse(localStorage.getItem(localStorageKey)) || { tripDate: '', days: [] };
      
      const startDateInput = document.getElementById('start-date');
      const daysLeftEl = document.getElementById('daysLeft');
      const addDayMainBtn = document.getElementById('addDay'); // Corrected to 'addDay'
      const addDaySidebarBtn = document.getElementById('shuffle'); // Corrected to 'shuffle'
      const daysContainer = document.getElementById('daysContainer');
      const totalsEl = document.getElementById('totals');
      const resetAllBtn = document.getElementById('resetAll');
      const toggleBtn = document.getElementById('toggle-theme');
      
      // Theme
      let currentTheme = localStorage.getItem('theme') || 'dark';
      setTheme(currentTheme);

      toggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
      });

      function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        const textFilter = theme === 'dark' ? 'invert(1)' : 'none';
        document.documentElement.style.setProperty('--text-filter', textFilter);
      }

      // Data Persistence
      function saveState() {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }

      // Trip Date & Countdown
      if (!state.tripDate) {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        state.tripDate = d.toISOString().slice(0, 10);
        saveState();
      }
      startDateInput.value = state.tripDate;

      startDateInput.addEventListener('change', e => {
        state.tripDate = e.target.value;
        renderCountdown();
        saveState();
      });

      function renderCountdown() {
        if (!state.tripDate) {
          daysLeftEl.textContent = '0';
          return;
        }
        const diff = Math.ceil((new Date(state.tripDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        daysLeftEl.textContent = Math.max(diff, 0);
      }
      renderCountdown();

      // Days & Activities
      function addDay() {
        state.days.push({ id: `day-${Date.now()}`, title: `Day ${state.days.length + 1}`, activities: [] });
        renderDays();
      }
      
      // Event listeners for "Add Day" buttons
      if (addDayMainBtn) {
        addDayMainBtn.addEventListener('click', addDay);
      }
      if (addDaySidebarBtn) {
        addDaySidebarBtn.addEventListener('click', addDay);
      }

      if (state.days.length === 0) {
        addDay();
      }

      function renderDays() {
        daysContainer.innerHTML = '';
        state.days.forEach((day, idx) => {
          const dayEl = document.createElement('section');
          dayEl.className = 'day';

          const header = document.createElement('div');
          header.style.display='flex'; header.style.justifyContent='space-between'; header.style.alignItems='center';

          const title = document.createElement('strong');
          title.textContent = day.title;

          const actions = document.createElement('div');
          actions.style.display='flex'; actions.style.gap='6px';

          const addActBtn = document.createElement('button');
          addActBtn.textContent='+ Add Activity'; addActBtn.className='icon-btn';
          addActBtn.addEventListener('click', ()=>{
            const time = prompt('Time (e.g., 09:00):','09:00');
            const name = prompt('Activity name:','New activity');
            if(name){ day.activities.push({id:`a-${Date.now()}`,time:time||'',name}); renderDays(); }
          });

          const delDay = document.createElement('button');
          delDay.textContent='🗑'; delDay.className='icon-btn';
          delDay.addEventListener('click',()=>{ if(confirm(`Delete ${day.title}?`)){ state.days.splice(idx,1); renderDays(); } });

          actions.appendChild(addActBtn); actions.appendChild(delDay);
          header.appendChild(title); header.appendChild(actions);
          dayEl.appendChild(header);

          const actList = document.createElement('ul'); actList.className='list';
          day.activities.forEach(act=>{
            const li=document.createElement('li'); li.className='activity';
            const t=document.createElement('span'); t.style.width='70px'; t.textContent=act.time||'';
            const name=document.createElement('span'); name.className='name'; name.textContent=act.name;
            const actions2=document.createElement('span'); actions2.style.display='flex'; actions2.style.gap='6px';
            const editBtn=document.createElement('button'); editBtn.className='icon-btn'; editBtn.textContent='✎';
            editBtn.addEventListener('click',()=>{ const newTime=prompt('Time:',act.time); const newName=prompt('Activity:',act.name); if(newName!==null)act.name=newName; if(newTime!==null)act.time=newTime; renderDays(); });
            const delAct=document.createElement('button'); delAct.className='icon-btn'; delAct.textContent='🗑';
            delAct.addEventListener('click',()=>{ if(confirm('Delete this activity?')){ day.activities = day.activities.filter(a=>a.id!==act.id); renderDays(); }});
            actions2.appendChild(editBtn); actions2.appendChild(delAct);
            li.appendChild(t); li.appendChild(name); li.appendChild(actions2);
            actList.appendChild(li);
          });

          dayEl.appendChild(actList); daysContainer.appendChild(dayEl);
        });

        totalsEl.textContent=`${state.days.length} days • ${state.days.reduce((s,d)=>s+d.activities.length,0)} activities`;
        renderCountdown();
        saveState();
      }

      resetAllBtn.addEventListener('click', () => {
        if (confirm('Reset all data? This cannot be undone.')) {
          localStorage.removeItem(localStorageKey);
          location.reload();
        }
      });

      renderDays();
    });