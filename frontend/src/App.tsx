import { FormEvent, useEffect, useState } from 'react';
import { api } from './api';
import type { Caracteristica, FormData } from './types';

const initialForm: FormData = {
  nombre: '',
  descripcion: '',
  tipo: 'texto',
  valor: '',
  activo: true,
};

function App() {
  const [items, setItems] = useState<Caracteristica[]>([]);
  const [form, setForm] = useState<FormData>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadItems = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await api.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      if (editingId === null) {
        const created = await api.create(form);
        // La interfaz se actualiza usando exactamente la respuesta confirmada por la API.
        setItems((current) => [...current, created]);
        setMessage(`Creado correctamente con ID ${created.id}.`);
      } else {
        const updated = await api.update(editingId, form);
        setItems((current) =>
          current.map((item) => (item.id === updated.id ? updated : item)),
        );
        setMessage(`Actualizado correctamente. ID ${updated.id}.`);
      }

      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Caracteristica) => {
    setEditingId(item.id);
    setForm({
      nombre: item.nombre,
      descripcion: item.descripcion,
      tipo: item.tipo,
      valor: item.valor,
      activo: item.activo,
    });
    setMessage('');
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`¿Eliminar la característica ${id}?`)) return;

    setError('');
    setMessage('');

    try {
      await api.remove(id);
      setItems((current) => current.filter((item) => item.id !== id));
      setMessage(`Eliminado correctamente. DELETE respondió 204.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setMessage('');
    setError('');
  };

  return (
    <main className="container">
      <header>
        <div>
          <p className="eyebrow">S10 · API HTTP</p>
          <h1>Gestión de características</h1>
          <p className="subtitle">
            Cliente React conectado a una API NestJS validada.
          </p>
        </div>

        <a href="http://localhost:3000/api" target="_blank" rel="noreferrer">
          Abrir Swagger
        </a>
      </header>

      <section className="grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>{editingId === null ? 'Nueva característica' : `Editar #${editingId}`}</h2>

          <label>
            Nombre
            <input
              required
              minLength={2}
              maxLength={50}
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Ej. Color"
            />
          </label>

          <label>
            Descripción
            <textarea
              required
              maxLength={150}
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              placeholder="Descripción de la característica"
            />
          </label>

          <label>
            Tipo
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            >
              <option value="texto">texto</option>
              <option value="numero">numero</option>
              <option value="booleano">booleano</option>
            </select>
          </label>

          <label>
            Valor
            <input
              required
              maxLength={100}
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
              placeholder="Ej. Rojo"
            />
          </label>

          <label className="check">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => setForm({ ...form, activo: e.target.checked })}
            />
            Activo
          </label>

          <div className="actions">
            <button disabled={saving} type="submit">
              {saving ? 'Guardando...' : editingId === null ? 'Crear' : 'Guardar cambios'}
            </button>

            {editingId !== null && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <section className="card">
          <div className="list-header">
            <h2>Características</h2>
            <button className="secondary" onClick={loadItems}>
              Actualizar
            </button>
          </div>

          {message && <div className="success">{message}</div>}
          {error && <div className="error">{error}</div>}

          {loading ? (
            <p>Cargando recursos...</p>
          ) : items.length === 0 ? (
            <p>No hay recursos.</p>
          ) : (
            <div className="items">
              {items.map((item) => (
                <article className="item" key={item.id}>
                  <div>
                    <span className="id">#{item.id}</span>
                    <h3>{item.nombre}</h3>
                    <p>{item.descripcion}</p>
                    <small>
                      Tipo: {item.tipo} · Valor: {item.valor} ·{' '}
                      {item.activo ? 'Activo' : 'Inactivo'}
                    </small>
                  </div>

                  <div className="item-actions">
                    <button className="secondary" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button className="danger" onClick={() => handleDelete(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      <footer>
        <span>Backend: http://localhost:3000</span>
        <span>Frontend: http://localhost:5173</span>
      </footer>
    </main>
  );
}

export default App;
