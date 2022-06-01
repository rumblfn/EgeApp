export default function encodeImageFileAsURL(e: any, setter: any, login: string = '', setter2: any = null) {
    try {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            if (typeof reader.result === 'string') {
                if (login) {
                    setter2(reader.result)
                    setter(login, reader.result)
                } else {
                    setter(reader.result)
                }
            }
        }
        reader.readAsDataURL(file);
    } catch (err) {
}}