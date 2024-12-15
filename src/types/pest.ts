export const PEST_CATEGORIES = {
  insects: 'Insects',
  rodents: 'Rodents',
  wildlife: 'Wildlife',
  other: 'Other'
} as const;

export const PEST_TYPES = {
  insects: [
    { id: 'ants', label: 'Ants' },
    { id: 'roaches', label: 'Roaches' },
    { id: 'spiders', label: 'Spiders' },
    { id: 'termites', label: 'Termites' },
    { id: 'bedbugs', label: 'Bed Bugs' },
    { id: 'flies', label: 'Flies' },
    { id: 'wasps', label: 'Wasps & Hornets' },
    { id: 'mosquitos', label: 'Mosquitos' }
  ],
  rodents: [
    { id: 'mice', label: 'Mice' },
    { id: 'rats', label: 'Rats' },
    { id: 'squirrels', label: 'Squirrels' }
  ],
  wildlife: [
    { id: 'raccoons', label: 'Raccoons' },
    { id: 'opossums', label: 'Opossums' },
    { id: 'snakes', label: 'Snakes' },
    { id: 'birds', label: 'Birds' }
  ],
  other: [
    { id: 'other', label: 'Other Pest Issue' }
  ]
} as const;