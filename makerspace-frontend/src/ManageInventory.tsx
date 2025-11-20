// Brandon McCrave 11/16/2025 Initial Creation
import { useState } from 'react';
import './ManageInventory.css';
import EditItemModal from './components/EditItemModal';
import { Button } from 'react-bootstrap';

type InventoryItem = {
  id: number;
  name: string;
  description?: string;
  amount: number;
};

const INVENTORY_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Item 1', description: 'Description 1', amount: 10 },
  { id: 2, name: 'Item 2', description: 'Description 2', amount: 5 },
  { id: 3, name: 'Item 3', description: 'Description 3', amount: 8 },
];

export function ManageInventory() {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowEdit(true);
  };

  const handleEditItemSave = (newQuantity: number) => {
    if (selectedItem) {
      console.log(`Editing item ${selectedItem.name} to ${newQuantity}`);
    }
    setShowEdit(false);
    setSelectedItem(null);
  };

  return (
    <div className="manage-inventory-root">
      <header className="manage-inventory-header">
        <div className="ManageInventory-Header-Title">
          <h1>Manage Inventory</h1>
        </div>

        <nav className="dashboard-links d-flex">
          <a href="#home" className="mi-nav-link">
            Home
          </a>
          <a href="#notifications" className="mi-nav-link">
            Notifications
          </a>
          <a href="#manage" className="mi-nav-link mi-nav-link-active">
            Manage Inventory
          </a>
          <a href="#logout" className="mi-nav-link">
            Logout
          </a>
        </nav>
      </header>

      <main className="manage-inventory">
        <h2>Inventory Management</h2>

        {/* Inventory list */}
        {INVENTORY_ITEMS.map((item) => (
          <div key={item.id} className="card mi-inventory-card mb-4">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="card-text mb-2">{item.description}</p>
                <p className="card-text mb-0">Item amount: {item.amount}</p>
              </div>

              <div className="mi-card-actions d-flex flex-column align-items-end">
                <button
                  type="button"
                  className="btn btn-link p-0 mb-2 mi-collapse-btn"
                  aria-label="collapse card"
                >
                  &#9660;
                </button>

                <Button variant="warning" onClick={() => handleEditClick(item)}>
                  Edit Item
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Edit modal (shared) */}
        <EditItemModal
          show={showEdit}
          onCancel={() => {
            setShowEdit(false);
            setSelectedItem(null);
          }}
          onSave={handleEditItemSave}
          itemName={selectedItem?.name ?? ''}
          currentQuantity={selectedItem?.amount ?? 0}
        />
      </main>
    </div>
  );
}
