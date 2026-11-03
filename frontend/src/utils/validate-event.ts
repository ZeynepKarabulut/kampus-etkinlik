import type { EventFormData } from '../types/campus-event';

export interface EventFormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
  description?: string;
}

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'En az 3 karakter olmalı.';
  }

  if (!data.category || data.category === '') {
    errors.category = 'Bir kategori seçin.';
  }

  if (!data.date || data.date === '') {
    errors.date = 'Tarih seçilmelidir.';
  }

  if (!data.time || data.time === '') {
    errors.time = 'Saat seçilmelidir.';
  }

  if (!data.location || data.location.trim() === '') {
    errors.location = 'Konum alanı boş olamaz.';
  }

  const capacityNum = Number(data.capacity);
  if (!data.capacity || !Number.isInteger(capacityNum) || capacityNum < 1 || capacityNum > 1000) {
    errors.capacity = '1 ile 1000 arası tam sayı.';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'En az 10 karakter olmalı.';
  }

  return errors;
}