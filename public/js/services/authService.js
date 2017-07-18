boiteApp.service("AuthService", function($q, $http) {

  let LOCAL_TOKEN_KEY = 'MayBookAppTokenKey';
    let isAuthenticated = false;
    let authToken;
    let role = '';


    let serializedCurrentAnnonce;

    const clearLocalStorage = () => {
     localStorage.clear(serializedCurrentAnnonce);
    }

    function loadUserCredentials() {
      const token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    let constantUser = {};
    let constantUserRole = {};
    let testLocalStorage;

    const getConstantUser = () => {
     constantUser = JSON.parse(localStorage.getItem('user'));
     return constantUser;
    }

    const setConstantUser = (user) => {
     constantUser = user;
    }

    const getConstantUserRole = () => {
     constantUserRole = localStorage.getItem('userRole');
     return constantUserRole;
    }

    const login = (user) => {
       return $http.post('api/login', user).then(
        function(response){
          if (response.data.success === false) {

          } else if (response.data.success === true) {
            storeUserCredentials(response.data.token);
            constantUser = localStorage.setItem('user', angular.toJson(response.data.user));
            testLocalStorage = localStorage.setItem('userRole', response.data.user.role);
          }
         return response;
        }, function(error){
         return error;
        }
       );
    };


    const register = (user) => {
        return $http.post('api/signup', user).then(
         function(response){
          return response;
         }, function(error){
          return error;
         }
        );
    };

    const getInfo = (user) => {
     return $http.get('api/memberinfo').then(
      function(response) {
      return response;
      }, function(error){
       return error;
      }
     );
    }

    const getAllUser = () => {
     return $http.get('api/users').then(
      function(response) {
      return response;
      }, function(error){
       return error;
      }
     );
    }

    const logout = () => {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      user: getConstantUser,
      setUser: setConstantUser,
      userRole: getConstantUserRole,
      loadUserCredentials: loadUserCredentials,
      login: login,
      register: register,
      getInfo: getInfo,
      getAllUser: getAllUser,
      logout: logout,
      clearLocalStorage: clearLocalStorage,
      isAuthenticated: function() {return isAuthenticated;},
    };

});
