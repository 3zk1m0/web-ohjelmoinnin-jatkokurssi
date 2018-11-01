export const equipments = [
    { id: '001', name: 'Tablet', description: 'Very good tablet.' },
    { id: '002', name: 'Phone', description: 'Not so good Android.' },
    { id: '003', name: 'Phablet', description: 'Too expensive phablet.' },
    ]
export const users = [
    { id: '001', name: 'Erkki', email: 'erkki123@example.com' },
    { id: '002', name: 'Kari', email: 'kartsa1337@example.com' },
    { id: '003', name: 'Esa', email: 'esa@esat.com' },
    ]
export const loans = [
    { id: '001', equipmentId: '001', userId: '003', begins: '2018-09-09', ends: '2018-10-15', returned: null },
    { id: '002', equipmentId: '002', userId: '001', begins: '2018-08-01', ends: '2018-09-05', returned: '2018-09-04' },
    { id: '003', equipmentId: '001', userId: '002', begins: '2018-11-15', ends: '2018-12-06', returned: null },
    ]
    