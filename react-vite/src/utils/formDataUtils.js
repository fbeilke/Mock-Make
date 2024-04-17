export function formDataFromObject(payload) {
    const formData = new FormData();
    for(let [key, value] of Object.entries(payload)) {
        formData.append(key, value);
    }
    return formData;
}