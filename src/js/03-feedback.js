
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'contact-form-key';

initPage();

const onFormInput = event => {
    const { name, value } = event.target;
    try {
        let saveData = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (saveData) {
            saveData = JSON.parse(saveData);
        } else {
            saveData = {};
        }
        saveData[name] = value;
        const stringifyData = JSON.stringify(saveData);
        localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData);
    } catch (error) {
        console.log(error);
    }
};
const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);

function initPage() {
    const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saveData) {
        return
    } 
        try {
            const parseData = JSON.parse(saveData);
            Object.entries(parseData).forEach(([name, value]) => {
                console.log(name);
                console.log(value);
                
                formRef.elements[name].value = value;
            });
            console.log(parseData);
        } catch (error) {
            console.log(error);
        }
}  
const handleSubmit = event => {
    event.preventDefault();
    const { elements: { email, message }, } = event.currentTarget;
    console.log({ email: email.value, message: message.value });
    event.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    lo
}
formRef.addEventListener('submit', handleSubmit);
