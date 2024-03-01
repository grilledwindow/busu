export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const searchParam = data.get('searchParam');
        console.log(searchParam);
    }
}