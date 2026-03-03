import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DayOfWeek, MenuItem, WeeklyMenu } from '../../types';
import { DAYS_OF_WEEK } from '../../constants';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type MealType = 'breakfast' | 'lunch' | 'dinner';

const MenuManager: React.FC = () => {
  const { menu, updateMenu } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<DayOfWeek | null>(null);
  const [editingMeal, setEditingMeal] = useState<MealType | null>(null);
  const [mealItems, setMealItems] = useState<string>('');

  const openModal = (day: DayOfWeek, meal: MealType) => {
    setEditingDay(day);
    setEditingMeal(meal);
    setMealItems(menu[day][meal].map(item => item.name).join(', '));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingDay(null);
    setEditingMeal(null);
    setMealItems('');
  };

  const handleSave = () => {
    if (!editingDay || !editingMeal) return;

    const newMenuItems: MenuItem[] = mealItems
      .split(',')
      .map(name => name.trim())
      .filter(name => name)
      .map((name, index) => ({ id: `${editingMeal.charAt(0)}${index + 1}`, name }));

    const newMenu: WeeklyMenu = JSON.parse(JSON.stringify(menu));
    newMenu[editingDay][editingMeal] = newMenuItems;
    updateMenu(newMenu);
    closeModal();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Weekly Menu</h2>
      <div className="space-y-8">
        {DAYS_OF_WEEK.map(day => (
          <Card key={day}>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">{day}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['breakfast', 'lunch', 'dinner'] as MealType[]).map(meal => (
                <div key={meal} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold capitalize text-gray-700">{meal}</h4>
                    <Button variant="ghost" size="sm" onClick={() => openModal(day, meal)}>Edit</Button>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    {menu[day][meal].map(item => <li key={item.id}>{item.name}</li>)}
                    {menu[day][meal].length === 0 && <li className="text-gray-400">No items</li>}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={`Edit ${editingMeal} for ${editingDay}`}>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Menu Items</label>
          <textarea
            value={mealItems}
            onChange={(e) => setMealItems(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Toast, Eggs, Juice"
          />
          <p className="text-xs text-gray-500">Enter items separated by commas.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuManager;