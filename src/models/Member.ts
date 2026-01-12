export interface Member {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  dateCreated?: string;
  photo?: string;
  cv?: string;
  email?: string;
  password?: string;
  pubs?: any[];

  /** discriminator */
  type?: 'Enseignant' | 'Etudiant' | string;

  // Enseignant-specific
  grade?: string;
  etablissement?: string;

  // Etudiant-specific
  dateInscription?: string;
  diplome?: string;
  encadrant?: { id?: number } | number | null;
}