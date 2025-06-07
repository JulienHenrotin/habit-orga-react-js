import { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:3000'

export default function HabitEntryForm() {
  const [habits, setHabits] = useState([])
  const [selectedHabit, setSelectedHabit] = useState('')
  const [date, setDate] = useState('')
  const [repetitions, setRepetitions] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_BASE}/habits`)
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch(() => {
        setMessage('Failed to load habits')
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedHabit || !date || repetitions === '') return
    const res = await fetch(
      `${API_BASE}/habits/${selectedHabit}/days/${date}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repetitions: Number(repetitions) }),
      },
    )
    if (res.ok) {
      setMessage('Entry saved')
    } else {
      setMessage('Failed to save entry')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Habit</h2>
      <div>
        <label>
          Habit:
          <select
            value={selectedHabit}
            onChange={(e) => setSelectedHabit(e.target.value)}
          >
            <option value="">Select...</option>
            {habits.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Repetitions:
          <input
            type="number"
            min="0"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Save</button>
      {message && <p>{message}</p>}
    </form>
  )
}
