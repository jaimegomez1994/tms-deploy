export const LEGAL_ENTITIES = {
    PersonaFisica: 'Persona Fisica',
    PersonaMoral: 'Persona Moral'
};

export const getLegalEntityType = (rfc: string) => {
    const [PersonaFisicaKey, PersonaMoralKey] = Object.keys(LEGAL_ENTITIES);
    if (rfc.length > 13) {
        return PersonaMoralKey;
    } else {
        return PersonaFisicaKey;
    }
};
