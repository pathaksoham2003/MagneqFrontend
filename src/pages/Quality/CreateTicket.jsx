import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/buttons/Button'
import SuccessModal from '../../components/common/SuccessModal'

const modelOptions = [
  { value: '102/128/142/168', label: '102/128/142/168' },
];
const typeOptions = [
  { value: 'Flange/Foot', label: 'Flange/Foot' },
];
const issueOptions = [
  { value: 'quality', label: 'quality' },
];

const initialItem = () => ({
  model: modelOptions[0].value,
  type: typeOptions[0].value,
  issue: issueOptions[0].value,
});

const CreateTicket = () => {
  const [items, setItems] = useState([initialItem()]);
  const [otherDetails, setOtherDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleItemChange = (idx, key, value) => {
    const newItems = [...items];
    newItems[idx][key] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, initialItem()]);
  };

  const handleRemoveItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const isFormValid = items.every(item => item.model && item.type && item.issue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setShowModal(true);

    if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    modalTimeoutRef.current = setTimeout(() => {
      setShowModal(false);
      navigate('/quality/card');
    }, 2000);
  };

  React.useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="rounded-2xl shadow border ml-0 mt-8"
      style={{
        background: "rgba(var(--background))",
        borderColor: "rgba(var(--border))",
        color: "rgba(var(--text))",
        maxWidth: 900,
        padding: '3rem 2rem',
      }}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2.5rem', color: 'rgba(var(--text))' }}>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6" style={{maxWidth: 500}}>
          <label className="block text-sm font-medium mb-1">Vendor Name</label>
          <input
            value="Mohan Kumar"
            readOnly
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              background: "rgba(var(--background))",
              color: "rgba(var(--text))",
              border: "1px solid rgba(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-wrap gap-6 mb-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Model</label>
              <select
                value={item.model}
                onChange={e => handleItemChange(idx, 'model', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  background: "rgba(var(--background))",
                  color: "rgba(var(--text))",
                  border: "1px solid rgba(var(--border))",
                  borderRadius: "0.5rem",
                }}
              >
                {modelOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={item.type}
                onChange={e => handleItemChange(idx, 'type', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  background: "rgba(var(--background))",
                  color: "rgba(var(--text))",
                  border: "1px solid rgba(var(--border))",
                  borderRadius: "0.5rem",
                }}
              >
                {typeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Issue in</label>
              <select
                value={item.issue}
                onChange={e => handleItemChange(idx, 'issue', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  background: "rgba(var(--background))",
                  color: "rgba(var(--text))",
                  border: "1px solid rgba(var(--border))",
                  borderRadius: "0.5rem",
                }}
              >
                {issueOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="text-red-500 text-xs font-medium ml-2 mb-2"
                style={{height: 32}}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddItem}
            className="text-[#4F7FFF] text-sm font-medium hover:underline bg-transparent p-0"
          >
            + Add more Items
          </button>
        </div>
        <div className="mb-8" style={{maxWidth: 500}}>
          <label className="block text-sm font-medium mb-1">Other Details</label>
          <input
            value={otherDetails}
            onChange={e => setOtherDetails(e.target.value)}
            placeholder="Other Details"
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              background: "rgba(var(--background))",
              color: "rgba(var(--text))",
              border: "1px solid rgba(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!isFormValid}
          className="px-8 py-3 text-base"
        >
          Submit Order
        </Button>
      </form>
      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default CreateTicket