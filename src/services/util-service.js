
const formatCell = (val, cellType) => {
    let cell = '';
    if (cellType === 'th') cell = val.replace(/_/g, " ");
    else cell = Object.prototype.toString.call(val) === "[object Null]" ? "-" : val;

    return cell;
}

const utilService = {
    formatCell,
}
export default utilService;