import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Student } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Card from '../ui/Card';

const StudentManager: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const openModal = (student: Student | null = null) => {
    setCurrentStudent(student);
    setName(student ? student.name : '');
    setEmail(student ? student.email : '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStudent(null);
    setName('');
    setEmail('');
  };

  const handleSubmit = () => {
    if (!name || !email) return;
    if (currentStudent) {
      updateStudent({ ...currentStudent, name, email });
    } else {
      addStudent(name, email);
    }
    closeModal();
  };
  
  const handleDelete = (studentId: string) => {
      if(window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
        deleteStudent(studentId);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Students</h2>
        <Button onClick={() => openModal()}>Add Student</Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {students.map((student, index) => (
              <tr key={student.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => openModal(student)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <p className="text-center py-4 text-gray-500">No students found.</p>}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentStudent ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit();}} className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@student.com" required />
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="secondary" type="button" onClick={closeModal}>Cancel</Button>
            <Button type="submit">{currentStudent ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentManager;