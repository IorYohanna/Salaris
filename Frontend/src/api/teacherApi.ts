import type { Teacher } from '../utils/types';

const API_URL = 'http://localhost:3000';

export const fetchUsers = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/auth`);
  if (!response.ok) throw new Error('Erreur réseau auth');
  return response.json();
};


export const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(`${API_URL}/enseignant`);
  if (!response.ok) throw new Error('Erreur réseau enseignants');
  return response.json();
};

export const createTeacher = async (
  data: Omit<Teacher, "prestation">,
): Promise<Teacher> => {
  const payload = {
    ...data,
    prestation: data.tauxHoraire * data.nbreHeures,
  };

  const response = await fetch(`${API_URL}/enseignant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Erreur lors de l'ajout");
  }

  return resData;
};

export const updateTeacher = async (teacher: Teacher): Promise<Teacher> => {
  const payload = {
    ...teacher,
    prestation: teacher.tauxHoraire * teacher.nbreHeures,
  };
  const response = await fetch(`${API_URL}/enseignant/${teacher.matricule}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Erreur lors de la modification');
  return response.json();
};

export const deleteTeacher = async (matricule: string): Promise<void> => {
  const response = await fetch(`${API_URL}/enseignant/${matricule}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression');
};