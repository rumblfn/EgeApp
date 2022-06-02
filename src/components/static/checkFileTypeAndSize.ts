export const checkFileTypeAndSize = (e: any, type: string) => {
    let file = e.target.files[0];
    if (file.size > 10000000) {
        alert('Вес файла больше 10мб');
        return false;
    }
    if (file.type.split('/')[0] !== type) {
        alert('Неверный тип файла');
        return false;
    }
    return true;
}