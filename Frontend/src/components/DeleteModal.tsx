import React from 'react';

interface DeleteModalProps {
  matricule: string;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ matricule, onConfirm, onClose }) => {
  return (
    <div className="modal">
      <div className="bg-[#1a1a1a] border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center">
        <h3 className="text-xl font-semibold mb-2">Confirmer la suppression</h3>
        <p className="text-gray-400 mb-6">
          Voulez-vous vraiment supprimer l'enseignant <strong>{matricule}</strong> ?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-400 py-3 rounded-xl font-bold"
          >
            Supprimer
          </button>
          <button
            onClick={onClose}
            className="cancelButton"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;