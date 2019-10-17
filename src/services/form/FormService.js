class FormService {
    findValue(value, formObject) {
        const result = formObject.find(({ title }) => title === value);
        return result.value
    }
}

const formService = new FormService();
export default formService;