export function removeTrailingDot(input) {
    return input.toString().replace(/\.$/, ''); // Replace trailing dot with an empty string
}

export function formatDate(originalDateString) {
    if (originalDateString === null) {
        return '';
    }
    var date = new Date(originalDateString);
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}
