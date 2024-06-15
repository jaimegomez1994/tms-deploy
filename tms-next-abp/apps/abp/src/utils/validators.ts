// patron del RFC, persona moral
const _rfc_pattern_pm =
    '^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$';
// patron del RFC, persona fisica
const _rfc_pattern_pf =
    '^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|' +
    '(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$';

export function validateFullRFC(rfc) {
    return rfc.match(_rfc_pattern_pm) || rfc.match(_rfc_pattern_pf);
}

export const validateRFC = (rfc) => {
    if (rfc.length < 12) {
        return [false, 'RFC debe tener al menos 12 caracteres'];
    }
    if (rfc.length > 13) {
        return [false, 'RFC puede tener solo 13 caracteres'];
    }

    if (!validateFullRFC(rfc.toUpperCase())) {
        return [false, 'RFC invalido'];
    }
    return [true, ''];
};
