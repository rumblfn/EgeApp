export default function encodeImageFileAsURL(e: any, setter: (value: string) => void) {
    try {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            if (typeof reader.result === 'string') {
                setter(reader.result)
            }
        }
        reader.readAsDataURL(file);
    } catch (err) {
}}