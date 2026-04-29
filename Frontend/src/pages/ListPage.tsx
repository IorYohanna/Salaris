import React, { useState } from 'react';
import type { Teacher } from '../utils/types';
import TeacherTable from '../components/TeacherTable';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { updateTeacher, deleteTeacher } from '../api/teacherApi';

interface ListPageProps {
  teachers: Teacher[];
  onRefresh: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
  formatCurrency: (num: number) => string;
}

const ListPage: React.FC<ListPageProps> = ({ teachers, onRefresh, showToast, formatCurrency }) => {
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteMatricule, setDeleteMatricule] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacher) return;
    try {
      await updateTeacher(editTeacher);
      showToast('Mise à jour réussie', 'success');
      setEditTeacher(null);
      onRefresh();
    } catch {
      showToast('Erreur lors de la modification', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteMatricule) return;
    try {
      await deleteTeacher(deleteMatricule);
      showToast('Enseignant supprimé', 'success');
      setDeleteMatricule(null);
      onRefresh();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <>
      <TeacherTable
        teachers={teachers}
        onEdit={setEditTeacher}
        onDelete={setDeleteMatricule}
        onRefresh={onRefresh}
        formatCurrency={formatCurrency}
      />

      {editTeacher && (
        <EditModal
          teacher={editTeacher}
          onChange={setEditTeacher}
          onSubmit={handleUpdate}
          onClose={() => setEditTeacher(null)}
        />
      )}

      {deleteMatricule && (
        <DeleteModal
          matricule={deleteMatricule}
          onConfirm={handleDelete}
          onClose={() => setDeleteMatricule(null)}
        />
      )}
    </>
  );
};

export default ListPage;