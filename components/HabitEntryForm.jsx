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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md p-4 bg-secondary text-white rounded"
    >
      <h2 className="text-xl font-bold text-primary">Log Habit</h2>
      <div>
        <label className="block mb-1">
          Habit:
          <select
            value={selectedHabit}
            onChange={(e) => setSelectedHabit(e.target.value)}
            className="mt-1 block w-full rounded border border-primary p-2 text-black"
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
        <label className="block mb-1">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded border border-primary p-2 text-black"
          />
        </label>
      </div>
      <div>
        <label className="block mb-1">
          Repetitions:
          <input
            type="number"
            min="0"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
            className="mt-1 block w-full rounded border border-primary p-2 text-black"
          />
        </label>
      </div>
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-white"
      >
        Save
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  )
}
