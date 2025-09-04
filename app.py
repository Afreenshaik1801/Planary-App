from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import sqlite3
import json

with open('destinations.json') as f:
    destinations_data = json.load(f)

app = Flask(__name__)
DB_NAME = 'planner.db'


@app.context_processor
def inject_now():
    return {'now': datetime.utcnow()}

# Initialize the database with all tables
def init_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()

    # Tasks
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )
    ''')

    # Habits
    c.execute('''
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            streak INTEGER DEFAULT 0
        )
    ''')

    # Travel Plans
    c.execute('''
        CREATE TABLE IF NOT EXISTS travels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination TEXT NOT NULL,
            notes TEXT
        )
    ''')

    # Packing Items
    c.execute('''
        CREATE TABLE IF NOT EXISTS packing_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            checked BOOLEAN DEFAULT 0
        )
    ''')

    conn.commit()
    conn.close()

# Database connection helper
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# Call once at startup
init_db()

# ---------------- ROUTES ----------------

@app.route('/')
def index():
    return render_template('index.html')

# ---------- Daily Planner ----------
@app.route('/planner')
def planner():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()
    conn.close()
    return render_template('planner.html', tasks=tasks)

@app.route('/add-task', methods=['POST'])
def add_task():
    content = request.form['content']
    if content:
        conn = get_db_connection()
        conn.execute("INSERT INTO tasks (title, completed) VALUES (?, ?)", (content, 0))
        conn.commit()
        conn.close()
    return redirect(url_for('planner'))

@app.route('/toggle_task/<int:task_id>', methods=['POST'])
def toggle_task(task_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT completed FROM tasks WHERE id = ?', (task_id,))
    task = cur.fetchone()
    if task:
        new_status = 0 if task['completed'] else 1
        cur.execute('UPDATE tasks SET completed = ? WHERE id = ?', (new_status, task_id))
        conn.commit()
    conn.close()
    return redirect(url_for('planner'))

@app.route('/edit_task/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    conn = get_db_connection()
    cur = conn.cursor()
    if request.method == 'POST':
        new_title = request.form['title']
        cur.execute('UPDATE tasks SET title = ? WHERE id = ?', (new_title, task_id))
        conn.commit()
        conn.close()
        return redirect(url_for('planner'))
    else:
        task = cur.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
        conn.close()
        return render_template('edit_task.html', task=task)

@app.route('/delete_task/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('planner'))

# ---------- Habits ----------
@app.route('/habits')
def habits():
    conn = get_db_connection()
    habits = conn.execute('SELECT * FROM habits').fetchall()
    conn.close()
    return render_template('habits.html', habits=habits)

@app.route('/add_habit', methods=['POST'])
def add_habit():
    name = request.form['name']
    if name:
        conn = get_db_connection()
        conn.execute('INSERT INTO habits (name) VALUES (?)', (name,))
        conn.commit()
        conn.close()
    return redirect(url_for('habits'))

@app.route('/increment_streak/<int:habit_id>', methods=['POST'])
def increment_streak(habit_id):
    conn = get_db_connection()
    conn.execute('UPDATE habits SET streak = streak + 1 WHERE id = ?', (habit_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('habits'))

# ---------- Travel Planner ----------
@app.route('/travel')
def travel():
    conn = get_db_connection()
    travels = conn.execute('SELECT * FROM travels').fetchall()
    conn.close()
    return render_template('travel.html', travels=travels)

@app.route('/add_travel', methods=['POST'])
def add_travel():
    destination = request.form['destination']
    notes = request.form['notes']
    if destination:
        conn = get_db_connection()
        conn.execute('INSERT INTO travels (destination, notes) VALUES (?, ?)', (destination, notes))
        conn.commit()
        conn.close()
    return redirect(url_for('travel'))

@app.route('/delete_travel/<int:travel_id>', methods=['POST'])
def delete_travel(travel_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM travels WHERE id = ?', (travel_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('travel'))

# ---------- Packing ----------
@app.route('/packing', methods=['GET', 'POST'])
def packing():
    conn = get_db_connection()
    if request.method == 'POST':
        name = request.form.get('item')
        category = request.form.get('category')
        if name and category:
            conn.execute('INSERT INTO packing_items (category, name) VALUES (?, ?)', (category, name))
            conn.commit()
    items = conn.execute('SELECT * FROM packing_items ORDER BY category, id').fetchall()
    conn.close()
    return render_template('packing.html', items=items)

@app.route('/toggle_packing/<int:item_id>', methods=['POST'])
def toggle_packing(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT checked FROM packing_items WHERE id = ?', (item_id,)).fetchone()
    if item:
        new_status = 0 if item['checked'] else 1
        conn.execute('UPDATE packing_items SET checked = ? WHERE id = ?', (new_status, item_id))
        conn.commit()
    conn.close()
    return redirect(url_for('packing'))

@app.route('/delete_packing/<int:item_id>', methods=['POST'])
def delete_packing(item_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM packing_items WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('packing'))

# ---------- Destination ----------
@app.route("/destination")
def destination():
    return render_template("destination.html", destinations_data=destinations_data)


# ---------- Currency Converter ----------
@app.route('/currency')
def currency():
    return render_template('currency.html')



# ---------- Trip Planner ----------
@app.route('/trip_planner')
def trip_planner():
    trip_start_date = datetime(2025, 9, 8)
    today = datetime.today()
    countdown_days = (trip_start_date - today).days
    return render_template("trip_planner.html", countdown_days=countdown_days, trip_start_date=trip_start_date.strftime("%Y-%m-%d"))



# ---------- Run Server ----------
if __name__ == '__main__':
    app.run(debug=True)
