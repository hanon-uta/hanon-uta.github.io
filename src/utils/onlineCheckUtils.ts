import axios from "axios";

export async function isOnline() {
    return axios.options(`/google19312be880b2f09b.html?t=${Date.now()}`, { timeout : 5000 }).then(() => {
        return true;
    }).catch((_: Error) => {
        return false;
    })
}