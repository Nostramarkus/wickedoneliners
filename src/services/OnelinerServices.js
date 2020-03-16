import axios from 'axios';

const apiCLient = axios.create({
   baseURL: `https://www.wickedoneliners.nl/_api/`,
   withCredentials: false,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
});

export default {
   getOneliners(data) {
      return apiCLient.post('getOneliners.php', data);
   },
   createAccount(data) {
      return apiCLient.post('createAccount.php', data);
   },
   login(data) {
      return apiCLient.post('login.php', data);
   },
   getUser(data) {
      return apiCLient.post('getUser.php', data);
   },
   saveUser(data) {
      return apiCLient.post('saveUser.php', data);
   },
   addOneliner(data) {
      return apiCLient.post('addOneliner.php', data);
   },
   updateLike(data) {
      return apiCLient.post('updateLike.php', data);
   },
   deleteToken(data) {
      return apiCLient.post('deleteToken.php', data);
   },
   checkUserPass(data) {
      return apiCLient.post('checkUserPass.php', data);
   },
   updateUserPass(data) {
      return apiCLient.post('updateUserPass.php', data);
   },
   deleteOneliner(data) {
      return apiCLient.post('deleteOneliner.php', data);
   },
   activateAccount(data) {
      return apiCLient.post('activateAccount.php', data);
   }
}
